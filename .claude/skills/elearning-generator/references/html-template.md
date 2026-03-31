# HTML Template — Umely E-learning Generator

Volledige basisstructuur voor elke e-learning. Kopieer dit als startpunt en vul de
`[PLACEHOLDERS]` in op basis van de transcriptie. Verwijder alle commentaarregels die
beginnen met `<!-- TODO:` voor je de output afrondt.

---

## Gebruik

1. Kopieer de volledige HTML hieronder
2. Vervang elke `[PLACEHOLDER]` met echte content uit de transcriptie
3. Pas `SCHERMEN` en `MODULE_TITELS` aan op het werkelijke aantal modules (4-8)
4. Voeg per module de passende componenten in (zie componentenbibliotheek in prompt.md)
5. Zorg dat elk `<!-- TODO: -->` comment is opgelost voor je de output afgeeft

---

## Volledige HTML

```html
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[MODULETITEL] | Umely E-learning</title>
<!-- VERPLICHT: Altijd deze twee fonts, nooit Inter/Roboto/Poppins/system-ui -->
<link href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>

/* ── DESIGN TOKENS ── */
:root {
  --bg:            #FFF8F2;
  --fg:            #27292D;
  --amber:         #FF8514;
  --flame:         #FF4D00;
  --gold:          #FFD964;
  --peach:         #FFD7AD;
  --cream:         #F7E6C2;
  --gradient:      linear-gradient(90deg, #FF8514, #FF4D00);
  --gradient-warm: linear-gradient(90deg, #FFD964, #FF8514, #FF4D00);
  --font-h:        'Arimo', Arial, sans-serif;
  --font-b:        'Montserrat', sans-serif;
  --radius:        12px;
  --radius-pill:   50px;
}

/* ── BASE ── */
*, *::before, *::after { box-sizing: border-box; }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-b);
  font-size: 1rem;
  line-height: 1.6;
  min-height: 100vh;
  margin: 0;
}
h1, h2, h3, h4 { font-family: var(--font-h); margin-top: 0; }

/* ── HEADER (altijd sticky, altijd donkergrijs — NOOIT oranje/gradient) ── */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--fg);
  border-bottom: 1px solid rgba(255,248,242,0.1);
  padding: 0.75rem 1.5rem 0;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 860px;
  margin: 0 auto;
}
.header-title {
  font-family: var(--font-h);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--bg);
  opacity: 0.8;
  text-align: center;
}

/* ── SCHERMEN ── */
.screen { display: none; max-width: 860px; margin: 2rem auto; padding: 0 1.5rem 4rem; }

/* ── KNOPPEN ── */
.btn {
  display: inline-block;
  background: var(--gradient);
  color: var(--bg);
  font-family: var(--font-b);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.8rem 2rem;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.1s;
}
.btn:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-outline {
  background: transparent;
  border: 2px solid var(--fg);
  color: var(--fg);
}
.btn-outline:hover { background: var(--fg); color: var(--bg); opacity: 1; }
.btn-wrap { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.5rem; }

/* ── WELKOMST-HERO ── */
.welcome-hero {
  background: var(--fg);
  color: var(--bg);
  border-radius: var(--radius);
  padding: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}
.welcome-hero::before {
  content: '';
  position: absolute; top: -80px; right: -80px;
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(255,133,20,0.35) 0%, transparent 70%);
  border-radius: 50%;
}
.welcome-hero::after {
  content: '';
  position: absolute; bottom: -60px; left: -40px;
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(255,77,0,0.2) 0%, transparent 70%);
  border-radius: 50%;
}
.welcome-hero h1 { font-family: var(--font-h); font-size: 2.2rem; margin-bottom: 0.75rem; position: relative; }
.welcome-hero p  { color: rgba(255,248,242,0.85); font-size: 1.05rem; position: relative; }
.welcome-badge {
  display: inline-block;
  background: rgba(255,248,242,0.15);
  color: var(--gold);
  font-family: var(--font-h);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.8rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1rem;
  position: relative;
}
.tijdsbadge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--cream);
  color: var(--fg);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.5rem;
}

/* ── LEERDOELEN ── */
.leerdoelen {
  background: var(--bg);
  border: 1px solid var(--peach);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.leerdoelen h3 {
  font-family: var(--font-h); font-size: 1rem;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--amber); margin-bottom: 1rem;
}
.leerdoelen ul { list-style: none; padding: 0; margin: 0; }
.leerdoelen li {
  padding: 0.5rem 0 0.5rem 1.75rem;
  position: relative;
  border-bottom: 1px solid var(--cream);
  font-size: 0.95rem;
}
.leerdoelen li:last-child { border-bottom: none; }
.leerdoelen li::before {
  content: '';
  position: absolute; left: 0; top: 50%;
  transform: translateY(-50%);
  width: 12px; height: 12px;
  background: var(--gradient);
  border-radius: 50%;
}

/* ── MODULE-HEADER (altijd donkergrijs) ── */
.module-header {
  background: var(--fg);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
}
.module-header .module-num {
  font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--gold); margin-bottom: 0.25rem;
}
.module-header h2 { font-family: var(--font-h); font-size: 1.5rem; color: var(--bg); margin: 0; }

/* ── CONTENT-KAARTEN ── */
.content-card {
  background: var(--bg);
  border: 1px solid var(--peach);
  border-radius: var(--radius);
  padding: 1.75rem;
  margin-bottom: 1.5rem;
}
.content-card p { margin-bottom: 0.75rem; }
.content-card p:last-child { margin-bottom: 0; }

/* ── KENNISCHECK ── */
.kennischeck {
  background: var(--fg); color: var(--bg);
  border-radius: var(--radius);
  padding: 1.75rem; margin-bottom: 1.5rem;
}
.kennischeck h3 { font-family: var(--font-h); font-size: 1rem; color: var(--gold); margin-bottom: 1rem; }
.kennischeck .kc-vraag { font-size: 1rem; margin-bottom: 1.25rem; }
.kc-opties { display: flex; flex-direction: column; gap: 0.5rem; }
.kc-optie {
  background: rgba(255,248,242,0.1);
  border: 1px solid rgba(255,248,242,0.2);
  border-radius: 8px; padding: 0.75rem 1rem;
  cursor: pointer; color: var(--bg);
  font-family: var(--font-b); font-size: 0.95rem;
  text-align: left; transition: all 0.2s;
}
.kc-optie:hover { background: rgba(255,133,20,0.25); border-color: var(--amber); }
.kc-feedback {
  margin-top: 0.75rem; padding: 0.75rem 1rem;
  border-radius: 8px; font-size: 0.9rem; display: none;
}
.kc-knoppen { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }

/* ── FEEDBACK-KLEUREN ── */
.correct { background: rgba(34,197,94,0.15) !important; border-color: #22c55e !important; }
.fout    { background: rgba(239,68,68,0.15) !important;  border-color: #ef4444 !important; }
.kc-feedback.correct { display: block; color: #16a34a; background: rgba(34,197,94,0.12); border: 1px solid #22c55e; }
.kc-feedback.fout    { display: block; color: #dc2626; background: rgba(239,68,68,0.12);  border: 1px solid #ef4444; }

/* ── FLASHCARDS ── */
.flashcard-set { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1.25rem 0; }
.flashcard {
  background: var(--fg); color: var(--bg);
  border-radius: var(--radius); padding: 1rem 1.25rem;
  cursor: pointer; flex: 1; min-width: 180px;
  transition: all 0.2s; border: 2px solid transparent;
}
.flashcard:hover { border-color: var(--amber); }
.flashcard .fc-term { font-family: var(--font-h); font-size: 0.9rem; font-weight: 700; color: var(--gold); margin-bottom: 0.5rem; }
.flashcard .fc-uitleg { font-size: 0.85rem; color: rgba(255,248,242,0.85); display: none; line-height: 1.5; }
.flashcard.open .fc-uitleg { display: block; }
.flashcard .fc-hint { font-size: 0.75rem; color: var(--amber); margin-top: 0.5rem; }
.flashcard.open .fc-hint { display: none; }

/* ── INVULVELD ── */
.invul-wrap { margin: 1.25rem 0; }
.invul-zin { font-size: 1rem; line-height: 2; color: var(--fg); }
.invul-input {
  border: none; border-bottom: 2px solid var(--amber);
  background: transparent; font-family: var(--font-b);
  font-size: 1rem; color: var(--fg);
  padding: 0 0.25rem; width: 140px; outline: none;
}
.invul-input.correct-input { border-color: #22c55e; color: #16a34a; }
.invul-input.fout-input    { border-color: #ef4444; color: #dc2626; }
.invul-feedback { font-size: 0.85rem; margin-top: 0.5rem; min-height: 1.2rem; }

/* ── DRAG-AND-DROP ── */
.drag-items {
  display: flex; flex-wrap: wrap; gap: 0.6rem;
  margin-bottom: 1.5rem; padding: 0.75rem;
  border: 2px dashed var(--peach); border-radius: var(--radius);
  min-height: 56px;
}
.drag-item {
  background: var(--fg); color: var(--bg);
  padding: 0.5rem 1rem; border-radius: var(--radius-pill);
  cursor: grab; font-size: 0.9rem; font-weight: 600;
  user-select: none; touch-action: none;
}
.drag-item:active { cursor: grabbing; opacity: 0.7; }
.drop-zones { display: flex; flex-direction: column; gap: 0.75rem; }
.drop-zone {
  border: 2px dashed var(--peach); border-radius: var(--radius);
  padding: 0.75rem 1rem; min-height: 64px; transition: all 0.2s;
}
.drop-zone.drag-over { border-color: var(--amber); background: rgba(255,133,20,0.08); }
.drop-zone-label {
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--amber); margin-bottom: 0.5rem;
}

/* ── KLIKBAAR DIAGRAM ── */
.diagram-wrap { position: relative; margin: 1.25rem 0; }
.diagram-svg-container { position: relative; }
.diagram-hotspot {
  position: absolute; width: 28px; height: 28px;
  background: var(--gradient); border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-size: 0.75rem; font-weight: 700;
  color: white; transition: transform 0.2s; z-index: 10;
}
.diagram-hotspot:hover { transform: scale(1.2); }
.diagram-popup {
  display: none; position: absolute;
  background: var(--fg); color: var(--bg);
  border-radius: var(--radius); padding: 0.75rem 1rem;
  font-size: 0.85rem; max-width: 220px;
  z-index: 20; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.diagram-popup.zichtbaar { display: block; }
.diagram-popup .popup-titel { font-family: var(--font-h); font-weight: 700; color: var(--gold); margin-bottom: 0.35rem; font-size: 0.9rem; }

/* ── STAPPENUITLEG ── */
.stappen-lijst { counter-reset: stap; margin: 1.25rem 0; }
.stap-item {
  display: flex; gap: 1rem; align-items: flex-start;
  margin-bottom: 1rem; padding: 1rem;
  background: var(--bg); border: 1px solid var(--peach); border-radius: var(--radius);
}
.stap-nummer {
  flex-shrink: 0; width: 36px; height: 36px;
  background: var(--gradient); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-weight: 700; color: var(--bg); font-size: 0.9rem;
}
.stap-content h4 { font-family: var(--font-h); font-size: 1rem; margin: 0 0 0.25rem; color: var(--fg); }
.stap-content p  { margin: 0; font-size: 0.9rem; }

/* ── TIP / LET-OP BOX ── */
.tip-box {
  border-left: 4px solid var(--amber);
  background: rgba(255,215,173,0.25);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 1rem 1.25rem; margin: 1.25rem 0;
}
.tip-box.waarschuwing { border-left-color: #ef4444; background: rgba(239,68,68,0.08); }
.tip-box-label { font-family: var(--font-h); font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem; }
.tip-box-label.tip { color: var(--amber); }
.tip-box-label.waarschuwing { color: #ef4444; }
.tip-box p { margin: 0; font-size: 0.9rem; }

/* ── VERGELIJKINGSTABEL ── */
.vergelijk-tabel {
  width: 100%; border-collapse: separate;
  border-spacing: 0; margin: 1.25rem 0;
  border: 1px solid var(--peach); border-radius: var(--radius); overflow: hidden;
}
.vergelijk-tabel th {
  background: var(--fg); color: var(--gold);
  font-family: var(--font-h); font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 0.75rem 1rem; text-align: left;
}
.vergelijk-tabel td { padding: 0.75rem 1rem; font-size: 0.9rem; border-top: 1px solid var(--cream); }
.vergelijk-tabel tr:nth-child(even) td { background: rgba(247,230,194,0.3); }

/* ── SORTEER-OEFENING ── */
.sorteer-lijst { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; min-height: 60px; }
.sorteer-item {
  background: var(--fg); color: var(--bg);
  padding: 0.65rem 1rem; border-radius: 8px;
  cursor: grab; font-size: 0.9rem; font-weight: 600;
  user-select: none; touch-action: none;
  display: flex; align-items: center; gap: 0.75rem;
}
.sorteer-item:active { cursor: grabbing; opacity: 0.7; }
.sorteer-nummer {
  width: 24px; height: 24px; border-radius: 50%;
  background: rgba(255,248,242,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}
.sorteer-feedback { font-size: 0.85rem; margin-top: 0.75rem; min-height: 1.2rem; }

/* ── SCENARIO / CASESTUDY ── */
.scenario-blok {
  background: var(--cream); border-radius: var(--radius);
  padding: 1.5rem; margin: 1.25rem 0; border: 1px solid var(--peach);
}
.scenario-label { font-family: var(--font-h); font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--amber); margin-bottom: 0.5rem; }
.scenario-tekst { font-size: 0.95rem; margin-bottom: 1.25rem; }
.scenario-keuzes { display: flex; flex-direction: column; gap: 0.5rem; }
.scenario-keuze {
  background: var(--bg); border: 2px solid var(--peach);
  border-radius: 8px; padding: 0.75rem 1rem;
  cursor: pointer; font-family: var(--font-b); font-size: 0.9rem;
  text-align: left; transition: all 0.2s;
}
.scenario-keuze:hover { border-color: var(--amber); }
.scenario-feedback { margin-top: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.85rem; display: none; }

/* ── ANNOTATIE-FIGUUR ── */
.annotatie-wrap { margin: 1.25rem 0; }
.annotatie-figuur {
  position: relative; background: var(--cream);
  border-radius: var(--radius); padding: 1.5rem;
  border: 1px solid var(--peach); min-height: 200px;
}
.annotatie-punt {
  position: absolute; width: 28px; height: 28px;
  background: var(--gradient); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-size: 0.75rem; font-weight: 700;
  color: white; cursor: pointer; transition: transform 0.2s; z-index: 10;
}
.annotatie-punt:hover { transform: scale(1.2); }
.annotatie-uitleg { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
.annotatie-item { display: flex; gap: 0.75rem; align-items: flex-start; }
.annotatie-nr {
  flex-shrink: 0; width: 24px; height: 24px;
  background: var(--gradient); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-size: 0.7rem; font-weight: 700; color: white;
}
.annotatie-tekst { font-size: 0.9rem; }
.annotatie-tekst strong { font-family: var(--font-h); color: var(--fg); }

/* ── TIJDLIJN ── */
.tijdlijn { position: relative; margin: 1.5rem 0; padding-left: 2rem; }
.tijdlijn::before {
  content: ''; position: absolute; left: 11px; top: 0; bottom: 0;
  width: 3px; background: var(--gradient); border-radius: 2px;
}
.tijdlijn-punt { position: relative; margin-bottom: 1.5rem; padding-left: 1.5rem; }
.tijdlijn-punt::before {
  content: ''; position: absolute; left: -2rem; top: 4px;
  width: 14px; height: 14px;
  background: var(--amber); border: 3px solid var(--bg); border-radius: 50%; z-index: 1;
}
.tijdlijn-punt h4 { font-family: var(--font-h); font-size: 0.95rem; margin: 0 0 0.25rem; color: var(--fg); }
.tijdlijn-punt p  { margin: 0; font-size: 0.85rem; color: rgba(39,41,45,0.8); }

/* ── PROCESSTROOM ── */
.processtroom { display: flex; flex-wrap: wrap; gap: 0; align-items: center; margin: 1.25rem 0; justify-content: center; }
.proces-blok {
  background: var(--fg); color: var(--bg);
  border-radius: var(--radius); padding: 1rem 1.25rem;
  min-width: 120px; text-align: center; flex: 0 1 auto;
}
.proces-blok h4 { font-family: var(--font-h); font-size: 0.85rem; color: var(--gold); margin: 0 0 0.25rem; }
.proces-blok p  { margin: 0; font-size: 0.8rem; color: rgba(255,248,242,0.8); }
.proces-pijl { font-size: 1.5rem; color: var(--amber); padding: 0 0.5rem; font-weight: 700; flex-shrink: 0; }

/* ── LEES-MEER ── */
.lees-meer-content { display: none; margin-top: 0.75rem; }
.lees-meer-content.open { display: block; }
.lees-meer-btn {
  background: none; border: none; color: var(--amber);
  font-family: var(--font-b); font-weight: 600; font-size: 0.9rem;
  cursor: pointer; padding: 0; text-decoration: underline;
}
.lees-meer-btn:hover { color: var(--flame); }

/* ── QUIZ ── */
.quiz-header { background: var(--gradient); border-radius: var(--radius); padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; color: var(--bg); }
.quiz-header h2 { font-family: var(--font-h); font-size: 1.4rem; margin: 0; }
.quiz-voortgang   { font-size: 0.8rem; color: var(--amber); font-weight: 600; margin-bottom: 0.75rem; }
.quiz-vraag-tekst { font-family: var(--font-h); font-size: 1.1rem; margin-bottom: 1.25rem; }
.quiz-opties { display: flex; flex-direction: column; gap: 0.6rem; }
.quiz-optie {
  background: var(--bg); border: 2px solid var(--peach);
  border-radius: 8px; padding: 0.85rem 1.1rem;
  cursor: pointer; font-family: var(--font-b); font-size: 0.95rem;
  text-align: left; transition: all 0.2s;
}
.quiz-optie:hover { border-color: var(--amber); background: rgba(255,133,20,0.06); }
.quiz-feedback { margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; display: none; }
.quiz-feedback.correct { display: block; color: #16a34a; background: rgba(34,197,94,0.12); border: 1px solid #22c55e; }
.quiz-feedback.fout    { display: block; color: #dc2626; background: rgba(239,68,68,0.12);  border: 1px solid #ef4444; }

/* ── RESULTAAT ── */
.resultaat-hero {
  background: var(--fg); color: var(--bg);
  border-radius: var(--radius); padding: 2.5rem;
  text-align: center; margin-bottom: 1.5rem;
  position: relative; overflow: hidden;
}
.resultaat-hero::before {
  content: ''; position: absolute; bottom: -60px; right: -60px;
  width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(255,133,20,0.3) 0%, transparent 70%);
  border-radius: 50%;
}
.score-cirkel {
  width: 100px; height: 100px;
  background: var(--gradient); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
  font-family: var(--font-h); font-size: 1.8rem; font-weight: 700;
  color: var(--bg); position: relative;
}
.certificaat {
  background: var(--bg); border: 2px solid var(--peach);
  border-radius: var(--radius); padding: 2rem;
  text-align: center; margin-bottom: 1.5rem;
}
.certificaat-title { font-family: var(--font-h); font-size: 1rem; color: var(--amber); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
.certificaat h2   { font-family: var(--font-h); font-size: 1.4rem; margin-bottom: 0.5rem; }
.certificaat-datum { font-size: 0.85rem; color: rgba(39,41,45,0.6); margin-top: 0.5rem; }

/* ── FOOTER ── */
footer {
  background: var(--fg);
  color: rgba(255,248,242,0.7);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  margin-top: 3rem;
}
footer strong { color: var(--gold); }
footer a { color: var(--peach); }

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
  .welcome-hero h1   { font-size: 1.6rem; }
  .screen            { padding: 0 1rem 3rem; }
  .btn-wrap          { flex-direction: column; }
  .btn               { text-align: center; }
  .flashcard-set     { flex-direction: column; }
  .processtroom      { flex-direction: column; }
  .proces-pijl       { transform: rotate(90deg); }
  .vergelijk-tabel   { font-size: 0.85rem; }
  .stap-item         { flex-direction: column; }
  .annotatie-figuur  { min-height: 150px; }
}

/* ── PRINT (certificaat PDF) ── */
@media print {
  header, footer, .btn-wrap, .nav-buttons, #pdf-download-btn { display: none !important; }
  body { background: white !important; }
  .screen { display: none !important; }
  #screen-result { display: block !important; max-width: 680px !important; margin: 0 auto !important; padding: 20mm !important; }
  .resultaat-hero { display: none !important; }
  .certificaat { display: block !important; border: 2px solid #FF8514 !important; box-shadow: none !important; page-break-inside: avoid; }
}

</style>
</head>
<body>

<!-- ══════════════════════════════════════════ -->
<!-- HEADER — kopieer exact, pas alleen de     -->
<!-- terug-link aan indien nodig               -->
<!-- ══════════════════════════════════════════ -->
<header>
  <div class="header-inner">
    <div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.25rem;">
      <a href="/modules.html"><img src="/logo.png" alt="Umely" style="height:65px;filter:brightness(0) invert(1);display:block;"></a>
      <a href="/modules.html" style="color:rgba(255,248,242,0.6);font-size:0.75rem;text-decoration:none;font-weight:600;">&#8592; Overzicht</a>
    </div>
    <span class="header-title" id="header-module-title"></span>
    <span style="width:100px;"></span>
  </div>
  <div style="max-width:860px;margin:0.75rem auto 0;background:rgba(255,248,242,0.15);border-radius:50px;height:6px;overflow:hidden;">
    <div id="progressBar" style="height:100%;background:var(--gradient);border-radius:50px;transition:width 0.4s ease;width:0%;"></div>
  </div>
  <div id="progressLabel" style="text-align:right;font-size:0.75rem;color:rgba(255,248,242,0.6);font-weight:600;max-width:860px;margin:0.25rem auto 0.5rem;padding-right:0;">0% voltooid</div>
</header>


<!-- ══════════════════════════════════════════ -->
<!-- WELKOMSTSCHERM                            -->
<!-- ══════════════════════════════════════════ -->
<div id="screen-welcome" class="screen">
  <div class="welcome-hero">
    <!-- TODO: Vervang door het Umely logo img — build-modules.js doet dit automatisch via string replace -->
    <div class="welcome-badge">Umely E-learning</div>
    <h1>[MODULETITEL]</h1>
    <p>[Korte omschrijving van het onderwerp in 1-2 zinnen. Eerlijk en direct.]</p>
  </div>

  <div class="leerdoelen">
    <h3>Na deze training kun je:</h3>
    <ul>
      <!-- TODO: 3-5 concrete leerdoelen op basis van de transcriptie -->
      <li>[Leerdoel 1]</li>
      <li>[Leerdoel 2]</li>
      <li>[Leerdoel 3]</li>
    </ul>
  </div>

  <div class="tijdsbadge">
    <!-- TODO: Schat de duur in op basis van het aantal modules + quiz -->
    &#128337; Ongeveer [X] minuten
  </div>

  <div class="btn-wrap">
    <button class="btn" onclick="goTo('screen-module-1')">Start de training</button>
  </div>
</div>


<!-- ══════════════════════════════════════════ -->
<!-- MODULE 1                                  -->
<!-- TODO: Voeg 4-8 modules toe               -->
<!-- Pas nummers aan in alle goTo()-calls      -->
<!-- ══════════════════════════════════════════ -->
<div id="screen-module-1" class="screen">
  <div class="module-header">
    <div class="module-num">Module 1</div>
    <h2>[Moduletitel]</h2>
  </div>

  <!-- TODO: Kies componenten op basis van de inhoud.
       Elke module vereist minimaal 1 interactief of visueel component.
       Zie prompt.md voor de volledige componentenbibliotheek (14 typen).

       Volg het UITLEG > VOORBEELD > AANDACHTSPUNTEN > INTERACTIE patroon
       voor elk kernbegrip in deze module. -->

  <!-- Voorbeeld: tekstblok -->
  <div class="content-card">
    <p>[Uitleg van het kernbegrip in 2-4 alinea's.]</p>
    <p>[Concreet voorbeeld uit de praktijk.]</p>
  </div>

  <!-- Voorbeeld: kennischeck (verplicht id="kc-N" en id="kc-feedback-N") -->
  <div id="kc-1" class="kennischeck">
    <h3>Kennischeck</h3>
    <p class="kc-vraag">[Vraagtekst?]</p>
    <div class="kc-opties">
      <button class="kc-optie" onclick="checkKC(1, this, false, 'screen-module-2', '[Uitleg waarom fout.]')">Antwoord A</button>
      <button class="kc-optie" onclick="checkKC(1, this, true,  'screen-module-2', '[Uitleg waarom correct.]')">Antwoord B</button>
      <button class="kc-optie" onclick="checkKC(1, this, false, 'screen-module-2', '[Uitleg waarom fout.]')">Antwoord C</button>
      <button class="kc-optie" onclick="checkKC(1, this, false, 'screen-module-2', '[Uitleg waarom fout.]')">Antwoord D</button>
    </div>
    <div id="kc-feedback-1" class="kc-feedback"></div>
  </div>

  <!-- Navigatie: altijd als laatste in elke module. Geen Vorige op screen-module-1. -->
  <div class="btn-wrap">
    <button class="btn" onclick="goTo('screen-module-2')">Volgende</button>
  </div>
</div>


<!-- ══════════════════════════════════════════ -->
<!-- MODULE 2 (kopieer dit blok voor 3, 4 ...) -->
<!-- ══════════════════════════════════════════ -->
<div id="screen-module-2" class="screen">
  <div class="module-header">
    <div class="module-num">Module 2</div>
    <h2>[Moduletitel]</h2>
  </div>

  <!-- TODO: Andere componentvorm dan module 1. Varieer altijd. -->

  <div class="btn-wrap">
    <button class="btn btn-outline" onclick="goBack()">Vorige</button>
    <button class="btn" onclick="goTo('screen-module-3')">Volgende</button>
  </div>
</div>


<!-- ══════════════════════════════════════════ -->
<!-- AFSLUITQUIZ — kopieer exact              -->
<!-- ══════════════════════════════════════════ -->
<div id="screen-quiz" class="screen">
  <div class="quiz-header">
    <h2>Afsluitquiz</h2>
  </div>
  <div class="content-card">
    <div id="quiz-voortgang" class="quiz-voortgang">Vraag 1 van 5</div>
    <p id="quiz-vraag-tekst" class="quiz-vraag-tekst"></p>
    <div id="quiz-opties" class="quiz-opties"></div>
    <div id="quiz-feedback" class="quiz-feedback"></div>
    <div class="btn-wrap">
      <button id="quiz-volgende-btn" class="btn" style="display:none;" onclick="volgendeQuizVraag()">Volgende vraag</button>
    </div>
  </div>
</div>


<!-- ══════════════════════════════════════════ -->
<!-- RESULTAATSCHERM — kopieer exact          -->
<!-- Pas alleen de h2 in certificaat-blok aan -->
<!-- ══════════════════════════════════════════ -->
<div id="screen-result" class="screen">
  <div class="resultaat-hero">
    <div class="score-cirkel" id="score-display">...</div>
    <h2 style="font-family:var(--font-h);margin-bottom:0.5rem;">Training afgerond!</h2>
    <p id="resultaat-boodschap" style="color:rgba(255,248,242,0.85);position:relative;"></p>
  </div>
  <div id="certificaat-blok" class="certificaat" style="display:none;">
    <div class="certificaat-title">Certificaat van voltooiing</div>
    <!-- TODO: Zet hier de echte moduletitel, geen placeholder -->
    <h2>[MODULETITEL]</h2>
    <p>Je hebt alle modules succesvol doorlopen en de quiz behaald.</p>
    <div class="certificaat-datum" id="cert-datum"></div>
    <div style="margin-top:1.5rem;">
      <button id="pdf-download-btn" class="btn" onclick="window.print()" style="display:none;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download certificaat als PDF
      </button>
    </div>
  </div>
  <div class="btn-wrap">
    <button class="btn btn-outline" onclick="herstart()">Opnieuw beginnen</button>
    <!-- TODO: Pas href aan naar de volgende module, of /modules.html als dit de laatste is -->
    <a class="btn" href="/modules.html">Volgende module &#8594;</a>
  </div>
</div>


<!-- ══════════════════════════════════════════ -->
<!-- FOOTER — kopieer exact                   -->
<!-- ══════════════════════════════════════════ -->
<footer>
  <strong>Umely</strong> - Jouw vaste AI-partner<br>
  <a href="mailto:info@umely.ai">info@umely.ai</a> · umely.ai
</footer>


<script>
// ══════════════════════════════════════════════
// SCHERMEN + TITELS
// TODO: Pas aan op werkelijk aantal modules (4-8)
// Voeg 'screen-module-3', 'screen-module-4' etc. toe
// Er is GEEN 'screen-drag' in deze array
// ══════════════════════════════════════════════
const SCHERMEN = [
  'screen-welcome',
  'screen-module-1',
  'screen-module-2',
  // TODO: voeg hier extra modules toe
  'screen-quiz',
  'screen-result'
];

const MODULE_TITELS = {
  'screen-welcome':  '',
  'screen-module-1': '[Moduletitel 1]',
  'screen-module-2': '[Moduletitel 2]',
  // TODO: voeg hier extra modules toe
  'screen-quiz':     'Afsluitquiz',
  'screen-result':   'Resultaat'
};

// ══════════════════════════════════════════════
// NAVIGATIE — kopieer exact, niet aanpassen
// ══════════════════════════════════════════════
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  const target = document.getElementById(screenId);
  if (target) { target.style.display = 'block'; window.scrollTo(0, 0); }
  updateProgress(screenId);
  const titleEl = document.getElementById('header-module-title');
  if (titleEl && MODULE_TITELS[screenId] !== undefined) {
    titleEl.textContent = MODULE_TITELS[screenId];
  }
}

function goBack() {
  const huidig = [...document.querySelectorAll('.screen')].find(s => s.style.display === 'block');
  if (!huidig) return;
  const idx = SCHERMEN.indexOf(huidig.id);
  if (idx > 0) goTo(SCHERMEN[idx - 1]);
}

function updateProgress(screenId) {
  const idx = SCHERMEN.indexOf(screenId);
  const pct = idx < 0 ? 100 : Math.round((idx / (SCHERMEN.length - 1)) * 100);
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = pct + '% voltooid';
}

// ══════════════════════════════════════════════
// INTERACTIE-FUNCTIES — kopieer exact
// ══════════════════════════════════════════════
function checkKC(nr, el, isCorrect, volgendeScherm, uitleg) {
  document.querySelectorAll('#kc-' + nr + ' .kc-optie').forEach(o => o.style.pointerEvents = 'none');
  el.classList.add(isCorrect ? 'correct' : 'fout');
  const fb = document.getElementById('kc-feedback-' + nr);
  const btnStijl = 'background:linear-gradient(90deg,#FF8514,#FF4D00);color:white;border:none;border-radius:50px;padding:10px 20px;font-weight:700;cursor:pointer;font-family:Montserrat,sans-serif;font-size:0.9rem;';
  const volgendeKnop = '<button style="' + btnStijl + '" onclick="goTo(\'' + volgendeScherm + '\')">Volgende</button>';
  if (isCorrect) {
    fb.className = 'kc-feedback correct';
    fb.innerHTML = '<strong>Correct!</strong> ' + uitleg + '<div class="kc-knoppen">' + volgendeKnop + '</div>';
  } else {
    fb.className = 'kc-feedback fout';
    fb.innerHTML = '<strong>Niet correct.</strong> ' + uitleg
      + '<div class="kc-knoppen"><button style="' + btnStijl + 'background:#27292D;" onclick="resetKC(' + nr + ')">Probeer opnieuw</button>'
      + volgendeKnop + '</div>';
  }
}

function resetKC(nr) {
  document.querySelectorAll('#kc-' + nr + ' .kc-optie').forEach(o => {
    o.style.pointerEvents = ''; o.classList.remove('correct', 'fout');
  });
  const fb = document.getElementById('kc-feedback-' + nr);
  fb.className = 'kc-feedback'; fb.innerHTML = '';
}

function toggleFlashcard(el) { el.classList.toggle('open'); }

function toggleLeesMeer(btn, contentId) {
  const content = document.getElementById(contentId);
  if (content) {
    content.classList.toggle('open');
    btn.textContent = content.classList.contains('open') ? 'Lees minder' : 'Lees meer';
  }
}

function checkInvul(inputId, correctAntwoord, feedbackId) {
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(feedbackId);
  const waarde = input.value.trim().toLowerCase();
  const correct = correctAntwoord.toLowerCase();
  if (waarde === correct || waarde.includes(correct) || correct.includes(waarde)) {
    input.classList.add('correct-input'); input.classList.remove('fout-input');
    feedback.textContent = 'Correct!'; feedback.style.color = '#16a34a';
  } else {
    input.classList.add('fout-input'); input.classList.remove('correct-input');
    feedback.textContent = 'Het juiste antwoord is: ' + correctAntwoord; feedback.style.color = '#dc2626';
  }
}

function togglePopup(popupId) {
  document.querySelectorAll('.diagram-popup').forEach(p => { if (p.id !== popupId) p.classList.remove('zichtbaar'); });
  const popup = document.getElementById(popupId);
  if (popup) popup.classList.toggle('zichtbaar');
}

function highlightAnnotatie(puntNr) {
  document.querySelectorAll('.annotatie-item').forEach(item => {
    item.style.background = item.dataset.nr === String(puntNr) ? 'rgba(255,133,20,0.1)' : 'transparent';
    item.style.borderRadius = '8px';
    item.style.padding = item.dataset.nr === String(puntNr) ? '0.5rem' : '0';
  });
}

function checkScenario(nr, el, isCorrect, uitleg) {
  document.querySelectorAll('#scenario-' + nr + ' .scenario-keuze').forEach(o => o.style.pointerEvents = 'none');
  el.classList.add(isCorrect ? 'correct' : 'fout');
  const fb = document.getElementById('scenario-feedback-' + nr);
  fb.className = 'scenario-feedback ' + (isCorrect ? 'correct' : 'fout');
  fb.innerHTML = (isCorrect ? '<strong>Goede keuze!</strong> ' : '<strong>Niet de beste keuze.</strong> ') + uitleg;
  fb.style.display = 'block';
}

// ── Drag-and-drop ──
let gesleeptItem = null;
function dragStart(e, el) { gesleeptItem = el; e.dataTransfer?.setData('text/plain', el.dataset.id); }
function dragOver(e, zone) { e.preventDefault(); zone.classList.add('drag-over'); }
function dragLeave(zone) { zone.classList.remove('drag-over'); }
function drop(e, zone, correctId) {
  e.preventDefault(); zone.classList.remove('drag-over');
  if (!gesleeptItem) return;
  zone.appendChild(gesleeptItem);
  zone.classList.add(gesleeptItem.dataset.id === correctId ? 'correct' : 'fout');
  gesleeptItem = null;
}
function resetDragDrop() {
  const bron = document.getElementById('drag-bron');
  if (!bron) return;
  document.querySelectorAll('.drag-item').forEach(item => bron.appendChild(item));
  document.querySelectorAll('.drop-zone').forEach(zone => zone.classList.remove('correct', 'fout', 'drag-over'));
}
document.addEventListener('touchstart', e => { if (e.target.classList.contains('drag-item')) gesleeptItem = e.target; }, { passive: true });
document.addEventListener('touchend', e => {
  if (!gesleeptItem) return;
  const t = e.changedTouches[0]; const el = document.elementFromPoint(t.clientX, t.clientY);
  const zone = el?.closest('.drop-zone');
  if (zone) { zone.appendChild(gesleeptItem); zone.classList.add(gesleeptItem.dataset.id === zone.dataset.correct ? 'correct' : 'fout'); }
  gesleeptItem = null;
});

// ── Sorteer-oefening ──
let gesorteerBron = null;
function sorteerDragStart(e, el) { gesorteerBron = el; e.dataTransfer?.setData('text/plain', el.dataset.positie); }
function sorteerDragOver(e, el) { e.preventDefault(); el.style.borderColor = 'var(--amber)'; }
function sorteerDragLeave(el) { el.style.borderColor = 'transparent'; }
function sorteerDrop(e, el) {
  e.preventDefault(); el.style.borderColor = 'transparent';
  if (!gesorteerBron || gesorteerBron === el) return;
  const lijst = el.parentNode; const items = [...lijst.children];
  const vanIdx = items.indexOf(gesorteerBron); const naarIdx = items.indexOf(el);
  if (vanIdx < naarIdx) { lijst.insertBefore(gesorteerBron, el.nextSibling); }
  else { lijst.insertBefore(gesorteerBron, el); }
  gesorteerBron = null;
}
function checkSorteer(lijstId, correcteVolgorde, feedbackId) {
  const lijst = document.getElementById(lijstId);
  const items = [...lijst.querySelectorAll('.sorteer-item')];
  const huidigeVolgorde = items.map(i => i.dataset.positie);
  const isCorrect = huidigeVolgorde.join(',') === correcteVolgorde.join(',');
  const fb = document.getElementById(feedbackId);
  if (isCorrect) {
    fb.textContent = 'Correct! Dit is de juiste volgorde.'; fb.style.color = '#16a34a';
    items.forEach(i => i.style.borderLeft = '3px solid #22c55e');
  } else {
    fb.textContent = 'Nog niet helemaal goed. Probeer de items opnieuw te ordenen.'; fb.style.color = '#dc2626';
    items.forEach(i => i.style.borderLeft = '3px solid #ef4444');
  }
}

// ══════════════════════════════════════════════
// QUIZ
// TODO: Vervang de placeholder-vragen door echte
// vragen uit de transcriptie. Altijd 5 vragen.
// correct: index van het juiste antwoord (0-gebaseerd)
// uitleg: altijd invullen, nooit leeg laten
// ══════════════════════════════════════════════
let quizScore = 0, quizHuidig = 0;

const quizVragen = [
  {
    vraag: '[Vraagtekst 1]',
    opties: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
    correct: 0,
    uitleg: '[Uitleg waarom dit het juiste antwoord is.]'
  },
  {
    vraag: '[Vraagtekst 2]',
    opties: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
    correct: 1,
    uitleg: '[Uitleg waarom dit het juiste antwoord is.]'
  },
  {
    vraag: '[Vraagtekst 3]',
    opties: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
    correct: 2,
    uitleg: '[Uitleg waarom dit het juiste antwoord is.]'
  },
  {
    vraag: '[Vraagtekst 4]',
    opties: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
    correct: 0,
    uitleg: '[Uitleg waarom dit het juiste antwoord is.]'
  },
  {
    vraag: '[Vraagtekst 5]',
    opties: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
    correct: 1,
    uitleg: '[Uitleg waarom dit het juiste antwoord is.]'
  }
];

function laadQuizVraag() {
  if (quizHuidig >= quizVragen.length) { toonResultaat(); return; }
  const v = quizVragen[quizHuidig];
  document.getElementById('quiz-voortgang').textContent = 'Vraag ' + (quizHuidig + 1) + ' van ' + quizVragen.length;
  document.getElementById('quiz-vraag-tekst').textContent = v.vraag;
  const el = document.getElementById('quiz-opties'); el.innerHTML = '';
  v.opties.forEach((opt, i) => {
    const btn = document.createElement('button'); btn.className = 'quiz-optie'; btn.textContent = opt;
    btn.onclick = () => beantwoordQuiz(i, btn); el.appendChild(btn);
  });
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-volgende-btn').style.display = 'none';
}

function beantwoordQuiz(gekozen, btn) {
  document.querySelectorAll('.quiz-optie').forEach(o => o.style.pointerEvents = 'none');
  const v = quizVragen[quizHuidig]; const isCorrect = gekozen === v.correct;
  btn.classList.add(isCorrect ? 'correct' : 'fout');
  document.querySelectorAll('.quiz-optie')[v.correct].classList.add('correct');
  if (isCorrect) quizScore++;
  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'fout');
  fb.textContent = (isCorrect ? 'Correct! ' : 'Niet helemaal. ') + v.uitleg;
  const volgende = document.getElementById('quiz-volgende-btn');
  volgende.style.display = 'inline-block';
  volgende.textContent = quizHuidig < quizVragen.length - 1 ? 'Volgende vraag' : 'Bekijk resultaat';
}

function volgendeQuizVraag() { quizHuidig++; laadQuizVraag(); }

// ══════════════════════════════════════════════
// RESULTAAT + VOORTGANG OPSLAAN
// Kopieer exact — window.__AUTH_TOKEN__ wordt
// geïnjecteerd door de module-loader van de webapp
// ══════════════════════════════════════════════
function toonResultaat() {
  goTo('screen-result');
  const pct = Math.round((quizScore / quizVragen.length) * 100);
  document.getElementById('score-display').textContent = pct + '%';
  document.getElementById('resultaat-boodschap').textContent = pct >= 70
    ? 'Gefeliciteerd! Je hebt de training succesvol afgerond.'
    : 'Je score is ' + pct + '%. Probeer het nog eens!';
  if (pct >= 70) {
    document.getElementById('certificaat-blok').style.display = 'block';
    document.getElementById('cert-datum').textContent = 'Behaald op ' +
      new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (typeof onQuizCompleted === 'function') onQuizCompleted(pct);
}

function herstart() {
  quizScore = 0; quizHuidig = 0;
  if (document.getElementById('drag-bron')) resetDragDrop();
  laadQuizVraag();
  goTo('screen-welcome');
}

// ══════════════════════════════════════════════
// INIT — kopieer exact
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  goTo('screen-welcome');
  laadQuizVraag();
});
</script>
</body>
</html>
```

---

## Checklist voor afronding

Doorloop dit voordat je de output afgeeft:

**Placeholders verwijderd:**
- [ ] Geen `[PLACEHOLDER]` of `[TODO]` tekst meer aanwezig
- [ ] Echte moduletitel in `<title>`, `<h1>` en `certificaat-blok h2`
- [ ] Alle quizvragen gevuld met echte content uit de transcriptie
- [ ] Alle `uitleg` velden in quizVragen ingevuld (nooit leeg)
- [ ] MODULE_TITELS gevuld met echte titels per module

**Structuur correct:**
- [ ] SCHERMEN-array klopt met het werkelijke aantal modules
- [ ] MODULE_TITELS heeft een entry voor elke ID in SCHERMEN
- [ ] Minimaal 5 verschillende componenttypen gebruikt
- [ ] Nooit twee dezelfde interactievormen direct na elkaar
- [ ] Elke module heeft minimaal 1 interactief of visueel component
- [ ] Alle `id="kc-N"` en `id="kc-feedback-N"` uniek genummerd
- [ ] Geen `screen-drag` in SCHERMEN (drag-and-drop zit nu in een module)

**Huisstijl correct:**
- [ ] Fonts: Arimo + Montserrat aanwezig, geen Inter/Roboto/Poppins
- [ ] Header achtergrond is `var(--fg)` (donkergrijs), NIET oranje of gradient
- [ ] Geen `#FFFFFF` of `white` als kaart- of sectie-achtergrond
- [ ] Geen m-dashes in de tekst

**JavaScript correct:**
- [ ] Alle functies zijn TOP-LEVEL gedefinieerd (niet binnen DOMContentLoaded)
- [ ] `goTo()`, `updateProgress()`, `laadQuizVraag()`, `toonResultaat()`, `herstart()` aanwezig
- [ ] `toonResultaat()` roept `onQuizCompleted(pct)` aan (voor voortgangsopslag webapp)
