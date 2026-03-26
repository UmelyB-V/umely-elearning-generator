require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Versie-marker — modules die dit bevatten zijn al up-to-date
const MARKER = '// kc-v3-schermen-fallback';

// ── Nieuwe checkKC + resetKC (v3) ──
// Leest eerst kc-volgende-N (backwards compat), anders valt terug op SCHERMEN-array
const NIEUWE_FUNCTIES = `
function checkKC(nr, el, isCorrect) {
  // kc-v3-schermen-fallback
  document.querySelectorAll('#kc-' + nr + ' .kc-optie').forEach(o => o.style.pointerEvents = 'none');
  el.classList.add(isCorrect ? 'correct' : 'fout');
  const fb = document.getElementById('kc-feedback-' + nr);
  // Bepaal het volgende scherm: kc-volgende-N knop of SCHERMEN-array als fallback
  const volgendeBtn = document.getElementById('kc-volgende-' + nr);
  let volgendeOnclick = volgendeBtn ? volgendeBtn.getAttribute('onclick') : null;
  if (!volgendeOnclick && typeof SCHERMEN !== 'undefined') {
    const act = document.querySelector('.screen.active');
    if (act) {
      const idx = SCHERMEN.indexOf(act.id);
      if (idx !== -1 && idx < SCHERMEN.length - 1) {
        volgendeOnclick = "goTo('" + SCHERMEN[idx + 1] + "')";
      }
    }
  }
  const btnStijl = 'background:linear-gradient(90deg,#FF8514,#FF4D00);color:white;border:none;border-radius:50px;padding:10px 20px;font-weight:700;cursor:pointer;';
  const volgendeKnop = volgendeOnclick
    ? '<button style="' + btnStijl + '" onclick="' + volgendeOnclick + '">Volgende vraag \\u2192</button>'
    : '';
  if (isCorrect) {
    fb.className = 'kc-feedback correct';
    fb.innerHTML = '<span>\\u2713 Correct!</span>'
      + '<div class="kc-knoppen">'
      + volgendeKnop
      + '</div>';
  } else {
    fb.className = 'kc-feedback fout';
    fb.innerHTML = '<span>\\u2717 Niet correct.</span>'
      + '<div class="kc-knoppen">'
      + '<button style="' + btnStijl + '" onclick="resetKC(' + nr + ')">\\u21a9 Probeer opnieuw</button>'
      + volgendeKnop
      + '</div>';
  }
}

function resetKC(nr) {
  document.querySelectorAll('#kc-' + nr + ' .kc-optie').forEach(o => {
    o.style.pointerEvents = '';
    o.classList.remove('correct', 'fout');
  });
  const fb = document.getElementById('kc-feedback-' + nr);
  fb.className = 'kc-feedback';
  fb.innerHTML = '';
}`;

// ── CSS toevoeging voor .kc-knoppen ──
const KC_KNOPPEN_CSS = `
.kc-knoppen {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}`;

function migreerHTML(html) {
  // Skip als al gemigreerd met v3
  if (html.includes(MARKER)) {
    return { html, gewijzigd: false };
  }

  let gewijzigd = false;

  // Vervang checkKC + resetKC via string-positie (robuuster dan regex)
  const checkKCStart = html.indexOf('function checkKC');
  if (checkKCStart !== -1) {
    const resetKCIdx = html.indexOf('function resetKC', checkKCStart);
    let end;

    if (resetKCIdx !== -1) {
      // Vind de sluitende } van resetKC door accolades te tellen
      end = vindFuncEinde(html, resetKCIdx);
    } else {
      // Geen resetKC — vind einde van checkKC alleen
      end = vindFuncEinde(html, checkKCStart);
    }

    if (end !== -1) {
      html = html.slice(0, checkKCStart) + NIEUWE_FUNCTIES.trim() + html.slice(end);
      gewijzigd = true;
    }
  } else {
    // Geen checkKC gevonden — voeg alles toe voor </script>
    const scriptEnd = html.indexOf('</script>');
    if (scriptEnd !== -1) {
      html = html.slice(0, scriptEnd) + NIEUWE_FUNCTIES.trim() + '\n' + html.slice(scriptEnd);
      gewijzigd = true;
    }
  }

  // Voeg .kc-knoppen CSS toe als die nog niet bestaat
  if (!html.includes('.kc-knoppen')) {
    const foutIdx = html.indexOf('.kc-feedback.fout');
    if (foutIdx !== -1) {
      html = html.slice(0, foutIdx) + KC_KNOPPEN_CSS + '\n' + html.slice(foutIdx);
    }
    gewijzigd = true;
  }

  return { html, gewijzigd };
}

// Tel accolades om het einde van een functie te vinden
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
