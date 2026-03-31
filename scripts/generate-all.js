// generate-all.js
// Genereert alle 25 e-learning modules opnieuw via de production server.
//
// Gebruik:
//   AUTH_TOKEN=<jouw_supabase_token> node scripts/generate-all.js
//
// Token halen: ga naar de app in de browser, open DevTools (F12),
// Application > Local Storage > zoek naar 'access_token' in de Supabase-entry.

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://umely-elearning-generator-production.up.railway.app';
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const ROOT = path.join(__dirname, '..');

if (!AUTH_TOKEN) {
  console.error('\nGebruik: AUTH_TOKEN=<token> node scripts/generate-all.js\n');
  process.exit(1);
}

const MODULES = [
  'transcriptie-A1-wat-is-claude.md',
  'transcriptie-A2-ecosysteem.md',
  'transcriptie-A3-prompts.md',
  'transcriptie-B1-veiligheid.md',
  'transcriptie-B2-niet-developers.md',
  'transcriptie-B3-fouten.md',
  'transcriptie-C1-webapp.md',
  'transcriptie-C2-desktop.md',
  'transcriptie-C3-chrome.md',
  'transcriptie-C4-cowork.md',
  'transcriptie-C5-excel-powerpoint.md',
  'transcriptie-C6-settings.md',
  'transcriptie-C7-organisatie.md',
  'transcriptie-D1-claude-code.md',
  'transcriptie-D2-claude-md.md',
  'transcriptie-D3-plan-mode.md',
  'transcriptie-E1-mcp.md',
  'transcriptie-E2-connectors.md',
  'transcriptie-E3-plugins.md',
  'transcriptie-E4-skills.md',
  'transcriptie-E5-eerste-skill.md',
  'transcriptie-E6-agentic-workflows.md',
  'transcriptie-E7-portfolio-website.md',
  'transcriptie-I1-praktijktoets.md',
  'transcriptie-I2-certificaat.md',
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateModule(filename, index, total) {
  const label = `[${index}/${total}] ${filename.replace('transcriptie-', '').replace('.md', '')}`;
  const filePath = path.join(ROOT, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`${label} OVERGESLAGEN - bestand niet gevonden`);
    return null;
  }

  const transcription = fs.readFileSync(filePath, 'utf8');
  if (transcription.trim().length < 50) {
    console.error(`${label} OVERGESLAGEN - bestand te leeg`);
    return null;
  }

  // Start generatie
  let startRes;
  try {
    startRes = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ transcription })
    });
  } catch (e) {
    console.error(`${label} FOUT bij starten: ${e.message}`);
    return null;
  }

  if (!startRes.ok) {
    const txt = await startRes.text();
    console.error(`${label} FOUT (${startRes.status}): ${txt}`);
    return null;
  }

  const { jobId } = await startRes.json();
  console.log(`${label} Gestart (job: ${jobId})`);

  // Poll tot klaar
  let dots = 0;
  while (true) {
    await sleep(6000);
    let pollRes;
    try {
      pollRes = await fetch(`${BASE_URL}/api/job/${jobId}`);
    } catch (e) {
      process.stdout.write('.');
      continue;
    }

    const job = await pollRes.json();

    if (job.status === 'done') {
      console.log(`\n${label} KLAAR -> ${job.url}`);
      return job;
    } else if (job.status === 'error') {
      console.error(`\n${label} GENERATIEFOUT: ${job.error}`);
      return null;
    } else {
      dots++;
      process.stdout.write(dots % 10 === 0 ? `\r${label} Bezig... ${job.progress || 0}%   ` : '.');
    }
  }
}

async function main() {
  console.log(`\n=== Umely Module Generator ===`);
  console.log(`${MODULES.length} modules te genereren op ${BASE_URL}\n`);

  const results = { ok: 0, fout: 0 };

  for (let i = 0; i < MODULES.length; i++) {
    const result = await generateModule(MODULES[i], i + 1, MODULES.length);
    if (result) results.ok++;
    else results.fout++;

    // Kleine pauze tussen modules
    if (i < MODULES.length - 1) {
      console.log('  Wacht 3 seconden...\n');
      await sleep(3000);
    }
  }

  console.log(`\n=== Klaar ===`);
  console.log(`Geslaagd: ${results.ok} | Mislukt: ${results.fout}`);
  if (results.fout > 0) {
    console.log('Herstart het script voor de mislukte modules.');
  }
}

main().catch(console.error);
