require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ── Nieuwe checkKC + resetKC ──
// Leest het volgende scherm uit de bestaande kc-volgende-N knop in de HTML,
// zodat de onclick-attributen op .kc-optie niet gewijzigd hoeven te worden.
const NIEUWE_FUNCTIES = `
function checkKC(nr, el, isCorrect) {
  document.querySelectorAll('#kc-' + nr + ' .kc-optie').forEach(o => o.style.pointerEvents = 'none');
  el.classList.add(isCorrect ? 'correct' : 'fout');
  const fb = document.getElementById('kc-feedback-' + nr);
  const volgendeBtn = document.getElementById('kc-volgende-' + nr);
  const volgendeOnclick = volgendeBtn ? volgendeBtn.getAttribute('onclick') : null;
  if (isCorrect) {
    fb.className = 'kc-feedback correct';
    fb.innerHTML = '<span>\\u2713 Correct!</span>'
      + '<div class="kc-knoppen">'
      + (volgendeOnclick ? '<button class="btn" onclick="' + volgendeOnclick + '">Volgende \\u2192</button>' : '')
      + '</div>';
  } else {
    fb.className = 'kc-feedback fout';
    fb.innerHTML = '<span>\\u2717 Niet correct.</span>'
      + '<div class="kc-knoppen">'
      + '<button style="background:linear-gradient(90deg,#FF8514,#FF4D00);color:white;border:none;border-radius:50px;padding:10px 20px;font-weight:700;cursor:pointer;" onclick="resetKC(' + nr + ')">\\u21a9 Probeer opnieuw</button>'
      + (volgendeOnclick ? '<button class="btn" onclick="' + volgendeOnclick + '">Volgende vraag \\u2192</button>' : '')
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
  let gewijzigd = false;

  // 1. Vervang de checkKC functie (match losjes op de functienaam)
  const checkKCRegex = /function checkKC\s*\([\s\S]*?\{[\s\S]*?\n\}/;
  if (checkKCRegex.test(html)) {
    html = html.replace(checkKCRegex, NIEUWE_FUNCTIES.trim());
    gewijzigd = true;
  }

  // 2. Voeg resetKC toe als die nog niet bestaat
  if (!html.includes('function resetKC')) {
    // Voeg toe na checkKC als de bovenstaande replace het niet al deed
    if (!gewijzigd) {
      // checkKC niet gevonden via regex, voeg resetKC toe voor </script>
      html = html.replace('</script>', NIEUWE_FUNCTIES.trim() + '\n</script>');
      gewijzigd = true;
    }
  }

  // 3. Voeg .kc-knoppen CSS toe als die nog niet bestaat
  if (!html.includes('.kc-knoppen')) {
    html = html.replace('.kc-feedback.fout', KC_KNOPPEN_CSS + '\n.kc-feedback.fout');
    gewijzigd = true;
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
