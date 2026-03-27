require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const MARKER = '// resultaat-v1';

// ── Nieuwe toonResultaat + herstart ──
const NIEUWE_TOON_RESULTAAT = `
function toonResultaat() {
  // resultaat-v1
  goTo('screen-result');
  const pct = Math.round((quizScore / quizVragen.length) * 100);
  document.getElementById('score-display').textContent = pct + '%';
  document.getElementById('resultaat-boodschap').textContent = pct >= 70
    ? 'Gefeliciteerd! Je hebt de training succesvol afgerond.'
    : 'Je score is ' + pct + '%. Probeer het nog eens!';
  if (pct >= 70) {
    document.getElementById('certificaat-blok').style.display = 'block';
    document.getElementById('cert-datum').textContent = 'Behaald op ' +
      new Date().toLocaleDateString('nl-NL', { day:'numeric', month:'long', year:'numeric' });
  }
}`;

// ── Nieuw resultaat HTML-blok ──
function nieuwResultaatHTML(title) {
  return `<div id="screen-result" class="screen">
  <div class="resultaat-hero">
    <div class="score-cirkel" id="score-display">—</div>
    <h2 style="font-family:var(--font-h);margin-bottom:0.5rem;">Training afgerond!</h2>
    <p id="resultaat-boodschap" style="color:rgba(255,248,242,0.85);position:relative;"></p>
  </div>
  <div id="certificaat-blok" class="certificaat" style="display:none;">
    <div class="certificaat-title">🏆 Certificaat van voltooiing</div>
    <h2>${title}</h2>
    <p>Je hebt alle modules succesvol doorlopen en de quiz behaald.</p>
    <div class="certificaat-datum" id="cert-datum"></div>
  </div>
  <div class="btn-wrap">
    <button class="btn btn-outline" onclick="herstart()">↩ Opnieuw beginnen</button>
  </div>
</div>`;
}

// ── Vind einde van een HTML-div (tel <div>/<div> paren) ──
function vindDivEinde(html, start) {
  let depth = 0;
  let i = start;
  while (i < html.length) {
    const open = html.indexOf('<div', i);
    const close = html.indexOf('</div>', i);
    if (open === -1 && close === -1) break;
    if (open !== -1 && (close === -1 || open < close)) {
      depth++;
      i = open + 4;
    } else {
      depth--;
      i = close + 6;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// ── Vind einde van een JS-functie (tel { } paren) ──
function vindFuncEinde(html, start) {
  let depth = 0;
  let inFunc = false;
  for (let i = start; i < html.length; i++) {
    if (html[i] === '{') { depth++; inFunc = true; }
    else if (html[i] === '}') {
      depth--;
      if (inFunc && depth === 0) return i + 1;
    }
  }
  return -1;
}

function migreerHTML(html, title) {
  if (html.includes(MARKER)) {
    return { html, gewijzigd: false };
  }

  let gewijzigd = false;

  // ── 1. Vervang het screen-result div-blok ──
  const resultStart = html.indexOf('<div id="screen-result"');
  if (resultStart !== -1) {
    const resultEnd = vindDivEinde(html, resultStart);
    if (resultEnd !== -1) {
      html = html.slice(0, resultStart) + nieuwResultaatHTML(title) + html.slice(resultEnd);
      gewijzigd = true;
    }
  }

  // ── 2. Vervang toonResultaat() functie ──
  const toonStart = html.indexOf('function toonResultaat');
  if (toonStart !== -1) {
    const toonEnd = vindFuncEinde(html, toonStart);
    if (toonEnd !== -1) {
      html = html.slice(0, toonStart) + NIEUWE_TOON_RESULTAAT.trim() + html.slice(toonEnd);
      gewijzigd = true;
    }
  } else {
    // Geen toonResultaat — voeg in voor </script>
    const scriptEnd = html.lastIndexOf('</script>');
    if (scriptEnd !== -1) {
      html = html.slice(0, scriptEnd) + '\n' + NIEUWE_TOON_RESULTAAT.trim() + '\n' + html.slice(scriptEnd);
      gewijzigd = true;
    }
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
    const { html, gewijzigd } = migreerHTML(mod.html, mod.title || 'E-learning');

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
