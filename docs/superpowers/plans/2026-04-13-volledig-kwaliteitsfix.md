# E-learning Volledig Kwaliteitsfix — Implementatieplan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan.

**Goal:** Elke module 100% foutloos — technisch, inhoudelijk, pedagogisch en visueel.

**Architecture:** 8 parallelle fixing-agents (één per reeks/groep), elk verantwoordelijk voor lezen + fixen + rapporteren van hun modules.

**Tech Stack:** HTML, inline CSS/JS, shared CSS (`_shared-css.html`), shared JS (`_shared-js.html`), Supabase upload via `upload-modules.js`.

---

## Volledige kwaliteitschecklist — vlieg vanuit ALLE hoeken aan

### HOEK 1 — TECHNISCH (developer)

| Check | Wat te verifiëren | Hoe te fixen |
|---|---|---|
| goTo() targets | Elk `goTo('screen-X')` → `<div id="screen-X">` moet bestaan | Corrigeer screen-ID of voeg scherm toe |
| Nav-div IDs | Elk scherm in SCHERMEN → `<div id="nav-{screenId}">` in dat scherm | Voeg ontbrekende nav-div toe |
| SCHERMEN array | Bevat precies alle screen-IDs in volgorde (incl. screen-quiz, screen-result) | Aanvullen/corrigeren |
| MODULE_TITELS keys | Elke key in MODULE_TITELS bestaat als `<div id="...">` | Corrigeer keys |
| checkKC(nr,...) | `id="kc-{nr}"` en `id="kc-feedback-{nr}"` bestaan | Fix element-IDs |
| checkScenario(nr,...) | `id="scenario-{nr}"` en `id="scenario-feedback-{nr}"` bestaan | Fix element-IDs |
| Quiz JSON | Geldig JSON tussen QUIZ_START en QUIZ_END | Fix syntax, verplaats naar correcte positie |
| Quiz correct-index | `correct` waarde binnen 0..opties.length-1 | Fix index |
| Externe bronnen | Geen externe scripts, afbeeldingen of fonts via URL | Verwijder/vervang |
| Credentials | Geen API-keys of tokens zichtbaar | Verwijder direct |

**Note:** Quiz opties worden geshuft door `_shuffleIndices()` in shared JS — correct-index distributie is geen issue.

### HOEK 2 — STRUCTUUR (architectuur)

| Check | Wat te verifiëren |
|---|---|
| class="screen start" | Alleen welkomscherm, nergens anders |
| welcome-hero > welcome-badge | Aanwezig in welkomscherm |
| leerdoelen als `<ul>` | Aanwezig, vóór tijdsbadge |
| tijdsbadge | Aanwezig, na leerdoelen |
| MODULE_TITELS waarden | Nooit "Module 1", "Onderdeel 1", "Topic X - Verdieping" |
| h1 moduletitel | Correct nummer (E1 zegt E1, niet E2) |
| Kennischecks | Op eigen -kc schermen, NOOIT embedded in contentschermen |
| "Naar de afsluitquiz" | Aanwezig op het LAATSTE contentscherm |
| Geen inline nav-knoppen | Verboden in contentschermen (behalve de quiz-knop) |
| Quiz 5-7 vragen | Min. 5, max. 7; elke vraag heeft inhoudelijk uitleg-veld |
| Flashcard onclick | Altijd `onclick="toggleFlashcard(this)"` |
| Min. 5 componenttypen | content-card, tip-box, flashcard-set, stappen-lijst, vergelijk-tabel, etc. |

### HOEK 3 — SCHRIJFKWALITEIT (content)

| Check | Verboden |
|---|---|
| Tijdsgebonden taal | "op dit moment", "momenteel", "binnenkort", "in 2024/2025/2026", "nieuwste versie", "zojuist gelanceerd", "op moment van schrijven" |
| AI-opvulling | "gebruik Claude verstandig", "mogelijkheden zijn eindeloos", "revolutionaire technologie", "krachtige AI-assistent" |
| M-dashes | — in lopende HTML-tekst (niet in MODULE_TITELS-comments of SVG-labels) |
| Prijsbedragen | €XX, $XX (vervang door "zie claude.ai/pricing") |
| Placeholder-tekst | Zichtbare `[placeholder]` in kopieerbare content voor gebruiker |
| Marketingclaims Umely | "beste AI-cursus", "unieke methode" etc. |
| Waarschuwing zonder actie | "Controleer altijd" zonder concrete stap/URL/instructie |
| Scherm zonder actie | Elk contentscherm heeft min. 1 concrete handeling, voorbeeld of oefening |

### HOEK 4 — DESIGN & SVG (designer)

| Check | Regel |
|---|---|
| SVG viewBox breedte | ALTIJD 580: `viewBox="0 0 580 [hoogte]"` |
| SVG kleuren | Toegestaan: #FFF8F2, #27292D, #FF8514, #FF4D00, #FFD964, #FFD7AD, #F7E6C2, #EDEBE8, #EAE6E0, rgba-afgeleiden van deze. Ook OK: #ef4444, #22c55e (feedback-kleuren uit shared CSS). NIET OK: #F7F4F0 → vervang door #FFF8F2 |
| SVG font | `font-family="Arial, sans-serif"` op ALLE tekst-elementen |
| SVG width | `style="width:100%;display:block;"` op SVG-element |
| visual-block wrapper | Elk inline SVG-blok in `<div class="visual-block">` |
| Module-header kleur | Altijd `background:var(--fg)` = #27292D, NOOIT gradient |
| Geen externe afbeeldingen | Alles inline |

### HOEK 5 — INHOUD & FEITELIJKHEID

| Check | Actie |
|---|---|
| Interne moduleVerwijzingen | Verifieer dat C8, E8, D3 etc. bestaan als bestanden; corrigeer anders |
| URL-consistentie | claude.ai overal (niet claude.com), support.claude.com → docs.anthropic.com |
| Terminologie-consistentie | "Plugin" definitie per module consistent; "Cowork", "Connector" consistent |
| Tegenstrijdige claims | E1 vs E2 over gratis Connectors: één versie aanhouden |
| Feitelijke claims | Voeg disclaimer toe of maak tijdloos als claim kan verouderen |

### HOEK 6 — PEDAGOGIEK (e-learning professional)

| Check | Wat te verifiëren |
|---|---|
| Leerdoelen meetbaar | "Je kunt...", "Je beschrijft...", "Je past toe..." — geen activiteiten als leerdoel |
| KC test het geleerde | Kennischeck-vraag sluit aan op voorgaand scherm |
| Quiz test leerdoelen | Quizvragen dekken de leerdoelen, niet triviale details |
| Opbouw per onderdeel | X-1 uitleg → X-2 verdieping → X-3 praktijk → X-kc |
| Opbouw per module | Schermen bouwen logisch op |
| Rode draad reeks | Modules sluiten op elkaar aan |
| Concrete actie | Elk contentscherm heeft iets uitvoerbaars voor de student |

---

## Uitvoering — 8 parallelle agents

- Agent 1: A1, A2, A3, A4
- Agent 2: B1, B2, B3, B4
- Agent 3: C1, C2, C3, C4
- Agent 4: C5, C6, C7, C8
- Agent 5: D1, D2, D3, D4, D5
- Agent 6: E1, E2, E3-plugin-bouwen, E3-plugins
- Agent 7: E4, E5, E6, E7
- Agent 8: E8, I0, I1, I2

Elke agent: lezen → alle 6 hoeken checken → fixen → rapporteren wat gewijzigd is.
