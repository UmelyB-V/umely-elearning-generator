require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const LOGO_IMG = '<img src="/logo.png" alt="Umely" style="height:32px;">';

// Patronen die het emoji-logo in de header kunnen bevatten
const PATRONEN = [
  // <a class="logo" ...>🧠 <span>Umely</span></a>
  { regex: /(<a[^>]*class="logo"[^>]*>)\s*🧠\s*<span>Umely<\/span>\s*(<\/a>)/g,
    vervanging: `$1${LOGO_IMG}$2` },
  // <a class="logo" ...>🧠 Umely</a> (zonder span)
  { regex: /(<a[^>]*class="logo"[^>]*>)\s*🧠\s*Umely\s*(<\/a>)/g,
    vervanging: `$1${LOGO_IMG}$2` },
  // <span class="logo-icon">...</span> varianten
  { regex: /(<a[^>]*class="logo"[^>]*>)\s*<span class="logo-icon">[^<]*<\/span>\s*Umely\s*(<\/a>)/g,
    vervanging: `$1${LOGO_IMG}$2` },
];

function migreerHTML(html) {
  // Sla over als al gemigreerd
  if (html.includes('/logo.png')) return { html, gewijzigd: false };

  let gewijzigd = false;
  for (const { regex, vervanging } of PATRONEN) {
    const nieuw = html.replace(regex, vervanging);
    if (nieuw !== html) { html = nieuw; gewijzigd = true; }
  }
  return { html, gewijzigd };
}

async function run() {
  console.log('Modules ophalen uit Supabase...');
  const { data: modules, error } = await supabase
    .from('modules')
    .select('id, filename, title, html');

  if (error) { console.error('Fout bij ophalen:', error.message); process.exit(1); }
  console.log(`${modules.length} modules gevonden.\n`);

  let bijgewerkt = 0;
  let overgeslagen = 0;

  for (const mod of modules) {
    const { html, gewijzigd } = migreerHTML(mod.html);

    if (!gewijzigd) {
      console.log(`⏭  Overgeslagen (al up-to-date): ${mod.title}`);
      overgeslagen++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('modules')
      .update({ html })
      .eq('id', mod.id);

    if (updateError) {
      console.error(`✗  Fout bij ${mod.title}:`, updateError.message);
    } else {
      console.log(`✓  Bijgewerkt: ${mod.title}`);
      bijgewerkt++;
    }
  }

  console.log(`\nKlaar. ${bijgewerkt} bijgewerkt, ${overgeslagen} overgeslagen.`);
}

run();
