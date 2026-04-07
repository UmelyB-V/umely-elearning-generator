'use strict';

/**
 * computeLevel — pure functie, makkelijk te testen.
 * @param {Array<{slug: string}>} allModules - alle modules uit elearning.modules
 * @param {Array<{module_slug: string, score_pct: number, completed: boolean}>} userProgress
 * @returns {number} 0-4
 */
function computeLevel(allModules, userProgress) {
  const total = allModules.length;
  if (total === 0) return 0;

  const abModules = allModules.filter(m => /^elearning-[ab]/.test(m.slug));
  const totalAB = abModules.length;

  const done = userProgress.filter(p => p.completed && p.score_pct >= 70);
  const perfect = userProgress.filter(p => p.score_pct === 100);
  const abDone = done.filter(p => /^elearning-[ab]/.test(p.module_slug));

  if (perfect.length >= total) return 4;
  if (done.length >= total) return 3;
  if (done.length > total / 2) return 2;
  if (totalAB > 0 && abDone.length >= totalAB) return 1;
  return 0;
}

/**
 * Haalt het level op van een gebruiker.
 * @param {string} userId
 * @param {object} supabase
 * @returns {Promise<{level: number, completed: number, total: number}>}
 */
async function fetchLevel(userId, supabase) {
  const [{ data: allModules }, { data: progress }] = await Promise.all([
    supabase.from('modules').select('slug'),
    supabase.from('user_progress').select('module_slug, score_pct, completed').eq('user_id', userId),
  ]);

  const total = (allModules || []).length;
  const completedCount = (progress || []).filter(p => p.completed && p.score_pct >= 70).length;
  const level = computeLevel(allModules || [], progress || []);

  return { level, completed: completedCount, total };
}

/**
 * Geeft de minimale vereiste level om een room te lezen/schrijven.
 */
function canAccessRoom(userLevel, roomLevel) {
  return userLevel >= roomLevel;
}

/**
 * Mounts alle community routes op de Express app.
 * @param {object} app - Express app
 * @param {object} supabase - Supabase client (schema: elearning)
 * @param {Function} requireAuth - bestaande auth middleware
 */
module.exports = function mountCommunityRoutes(app, supabase, requireAuth) {
  const COMMUNITY_BETA = process.env.COMMUNITY_BETA === 'true';

  /**
   * Middleware: blokkeert niet-admins als COMMUNITY_BETA=true.
   */
  async function requireCommunityAccess(req, res, next) {
    if (!COMMUNITY_BETA) return next();

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return res.status(403).json({ error: 'Community is nog niet publiek beschikbaar.' });
    }
    req.isAdmin = true;
    next();
  }

  /**
   * GET /api/community/level
   * Geeft het huidige level van de ingelogde gebruiker terug.
   */
  app.get('/api/community/level', requireAuth, requireCommunityAccess, async (req, res) => {
    try {
      const result = await fetchLevel(req.user.id, supabase);

      // Admin-check (los van BETA: admins zijn altijd level 4 voor de UI)
      if (!req.isAdmin) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', req.user.id)
          .single();
        req.isAdmin = profile?.role === 'admin';
      }

      res.json({
        level: req.isAdmin ? Math.max(result.level, 4) : result.level,
        completed: result.completed,
        total: result.total,
        isAdmin: !!req.isAdmin,
      });
    } catch (err) {
      console.error('[community/level]', err.message);
      res.status(500).json({ error: 'Kon level niet berekenen.' });
    }
  });

  /**
   * GET /api/community/messages/:level
   * Geeft de laatste 100 berichten terug voor de opgegeven room.
   */
  app.get('/api/community/messages/:level', requireAuth, requireCommunityAccess, async (req, res) => {
    const roomLevel = parseInt(req.params.level, 10);
    if (![1, 2, 3, 4].includes(roomLevel)) {
      return res.status(400).json({ error: 'Ongeldig room-level.' });
    }

    // Resolve admin status (requireCommunityAccess zet req.isAdmin alleen als COMMUNITY_BETA=true)
    let isAdmin = req.isAdmin || false;
    if (!isAdmin) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', req.user.id).single();
      isAdmin = profile?.role === 'admin';
    }

    // Controleer of gebruiker dit level heeft (admins altijd toegestaan)
    if (!isAdmin) {
      const { level } = await fetchLevel(req.user.id, supabase);
      if (!canAccessRoom(level, roomLevel)) {
        return res.status(403).json({ error: 'Geen toegang tot deze room.' });
      }
    }

    const { data, error } = await supabase
      .from('community_messages')
      .select('id, user_name, is_admin, content, created_at')
      .eq('room_level', roomLevel)
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ messages: data || [] });
  });

  /**
   * POST /api/community/messages
   * Stuurt een nieuw bericht naar een room.
   * Body: { room_level: number, content: string }
   */
  app.post('/api/community/messages', requireAuth, requireCommunityAccess, async (req, res) => {
    const { room_level, content } = req.body;

    if (![1, 2, 3, 4].includes(room_level)) {
      return res.status(400).json({ error: 'Ongeldig room-level.' });
    }
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Bericht mag niet leeg zijn.' });
    }
    if (content.length > 2000) {
      return res.status(400).json({ error: 'Bericht mag maximaal 2000 tekens bevatten.' });
    }

    // Controleer of gebruiker dit level heeft
    let isAdmin = req.isAdmin || false;
    if (!isAdmin) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', req.user.id)
        .single();
      isAdmin = profile?.role === 'admin';
    }

    if (!isAdmin) {
      const { level } = await fetchLevel(req.user.id, supabase);
      if (!canAccessRoom(level, room_level)) {
        return res.status(403).json({ error: 'Geen toegang tot deze room.' });
      }
    }

    // Bepaal weergavenaam
    const meta = req.user.user_metadata || {};
    const userName = [meta.firstName, meta.lastName].filter(Boolean).join(' ')
      || req.user.email.split('@')[0];

    const { error } = await supabase
      .from('community_messages')
      .insert({
        room_level,
        user_id: req.user.id,
        user_name: userName,
        is_admin: isAdmin,
        content: content.trim(),
      });

    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  });
};

// Exporteer computeLevel apart zodat tests het direct kunnen importeren
module.exports.computeLevel = computeLevel;
