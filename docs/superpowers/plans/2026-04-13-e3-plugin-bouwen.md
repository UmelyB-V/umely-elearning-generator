# E3 — Je eerste plugin bouwen: Implementatieplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Een nieuwe e-learning module E3 bouwen die studenten stap voor stap leert een eigen MCP-plugin te maken met Claude Code, en die te koppelen aan de Claude desktop-app.

**Architecture:** Transcriptie → HTML content-bestand → build-modules.js → output HTML → upload naar Supabase. De module volgt de standaard schermstructuur van de Umely e-learning met welkomscherm, contentschermen, kennischecks, quiz en resultaat.

**Tech Stack:** HTML, inline CSS-componenten (gedeeld via `_shared-css.html`), inline JS-functies (gedeeld via `_shared-js.html`), build-modules.js, upload-modules.js, Supabase MCP (`dsxyygvvtwnsoiubrwxc`), schema `elearning`.

---

## Bestandsstructuur

| Actie | Bestand | Verantwoordelijkheid |
|---|---|---|
| Create | `transcriptie-E3-plugin-bouwen.md` | Bronbestand met alle content in proza |
| Create | `module-content/elearning-e3-plugin-bouwen.html` | Definitieve module HTML met alle schermen |
| Modify | `CLAUDE.md` (projectroot) | Slug toevoegen aan modulelijst |
| Output | `output/elearning-e3-plugin-bouwen-YYYYMMDD.html` | Gegenereerd door build-modules.js |

**Noot over oude E3:** `transcriptie-E3-plugins.md` en de Supabase-slug `elearning-e3-plugins` (Projects/Custom Instructions) blijven staan totdat die content een nieuwe plek krijgt. Dat is een aparte beslissing buiten dit plan.

---

## Task 1: Transcriptie schrijven

**Files:**
- Create: `transcriptie-E3-plugin-bouwen.md`

- [ ] **Stap 1: Maak het transcriptiebestand aan**

```markdown
# Transcriptie: E3 — Je eerste plugin bouwen

## Wat leer je in deze module?
Je leert wat het verschil is tussen een kant-en-klare Connector en een eigen plugin, hoe je met Claude Code een plugin bouwt die Claude toegang geeft tot jouw eigen data, en hoe je die plugin koppelt aan de Claude desktop-app. Na deze module heeft Claude toegang tot informatie die alleen jij hebt.

## Connector vs. plugin: wat is het verschil?

Je hebt in E2 geleerd hoe je een Connector inschakelt. Een Connector is een koppeling die Anthropic heeft gebouwd: jij schakelt hem in via de Claude-instellingen, en Claude kan daarna Gmail, je agenda of Notion gebruiken.

Een plugin werkt anders. Jij bouwt de koppeling zelf — niet Anthropic. Dat klinkt ingewikkelder dan het is, want Claude Code schrijft de code voor je. Het enige wat jij doet: beschrijven wat Claude moet kunnen opzoeken.

Wanneer kies je voor welk?

- Gebruik een Connector als de tool al bestaat als Connector (Gmail, agenda, Notion, Slack).
- Gebruik een plugin als je eigen data wilt ontsluiten die nergens anders staat: je eigen klantenlijst, je interne FAQ, je bedrijfsprocedures, je tarieven.

Dat is het kernverschil: een Connector koppelt Claude aan andermans systemen. Een plugin koppelt Claude aan jóúw systemen.

## Wat gaat jouw plugin weten?

Voordat je Claude Code instrueert, beslis je wat je plugin moet weten. Een paar voorbeelden per sector:

- **Makelaarskantoor:** lijst van actieve woningen met adres, vraagprijs en status (beschikbaar/onder bod/verkocht)
- **Advocatenkantoor:** overzicht van lopende zaken met partijen, deadlines en dossiernummer
- **Marketingbureau:** tone-of-voice per klant, merkwaarden en verboden woorden
- **Accountant:** vaste tarieven per dienst en servicepakketten

Schrijf dit op in gewone taal. Dat wordt de prompt voor Claude Code.

## Claude Code schrijft alles

Open Claude Code en gebruik deze prompttemplate:

---
Maak een MCP-server in Python die Claude toegang geeft tot de volgende informatie:

[hier beschrijf jij wat de plugin moet weten — in gewone taal]

Genereer drie bestanden:
1. De servercode als plugin.py
2. Een startscript start-plugin.bat voor Windows
3. De exacte tekst die ik moet toevoegen aan mijn Claude-configuratiebestand claude_desktop_config.json, inclusief het volledige pad naar plugin.py

Gebruik de officiële MCP Python SDK. Als Python niet beschikbaar is, gebruik dan Node.js.
---

Claude Code genereert de drie bestanden. Sla ze op in één map. Geef die map een duidelijke naam, zoals `mijn-plugin`. Je hebt het pad naar die map nodig in de volgende stap.

## De plugin koppelen aan Claude

Je vertelt Claude waar de plugin staat via een configuratiebestand. Claude leest dat bestand bij het opstarten.

**Stap 1: Configuratiebestand openen**

Het configuratiebestand staat op:
```
C:\Users\[jouwgebruikersnaam]\AppData\Roaming\Claude\claude_desktop_config.json
```

Open het in een tekstverwerker. Als het bestand niet bestaat, maak het aan en zet er `{}` in.

**Stap 2: Configuratieregel toevoegen**

Claude Code heeft de exacte tekst al voor je gegenereerd. Kopieer die tekst en plak hem in het configuratiebestand ter vervanging van de bestaande inhoud.

**Stap 3: Opslaan en Claude herstarten**

Sla het bestand op. Sluit de Claude desktop-app volledig. Open Claude opnieuw.

JSON is gevoelig voor fouten: als er een komma of haakje mist, start Claude niet correct op. Als dat gebeurt: open Claude Code en vraag "Mijn configuratiebestand geeft een fout. Dit is de inhoud: [plak de inhoud]. Wat klopt er niet?" Claude Code corrigeert het.

## Plugin starten en verifiëren

**Stap 1: Plugin starten**

Ga naar de map waar je plugin staat. Dubbelklik `start-plugin.bat`. Er opent een terminalvenster — dat venster moet open blijven. De plugin draait zolang dat venster open is.

**Stap 2: Testen**

Stel Claude een vraag over informatie die alleen in jouw plugin staat. Bijvoorbeeld: "Wat zijn de actieve woningen in ons systeem?" of "Wat zijn onze tarieven voor belastingaangifte?"

Als Claude antwoordt met informatie uit je plugin: de plugin werkt.

Als Claude zegt dat hij het niet weet:
1. Controleer of het terminalvenster van de plugin nog open is
2. Controleer of je Claude hebt herstart nadat je de configuratieregel hebt toegevoegd
3. Open Claude Code en vraag: "Mijn plugin werkt niet. Dit is mijn configuratieregel: [plak de regel]. Wat klopt er niet?"

## Samenvatting

Een plugin koppelt Claude aan jouw eigen data — iets wat een kant-en-klare Connector niet kan. Claude Code schrijft de plugin voor je: je beschrijft wat Claude moet weten, Claude Code genereert de servercode, een startscript en de configuratieregel. Je plakt die regel in het Claude-configuratiebestand, herstart Claude, start de plugin en test of het werkt. Als iets niet klopt, gebruik je Claude Code zelf om de fout op te sporen.
```

- [ ] **Stap 2: Commit**

```bash
git add transcriptie-E3-plugin-bouwen.md
git commit -m "feat: transcriptie E3 plugin bouwen toegevoegd"
```

---

## Task 2: HTML-skelet met header en quiz

**Files:**
- Create: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Maak het HTML-bestand aan met de verplichte header**

```html
<!-- TITLE: E3 - Je eerste plugin bouwen -->
<!-- SCHERMEN: 'screen-welcome','screen-module-1-1','screen-module-1-kc','screen-module-2-1','screen-module-2-2','screen-module-2-kc','screen-module-3-1','screen-module-3-2','screen-module-3-kc','screen-quiz','screen-result' -->
<!-- MODULE_TITELS: 'screen-module-1-1':'Connector vs. plugin: wat is het verschil?','screen-module-1-kc':'Kennischeck','screen-module-2-1':'Wat gaat jouw plugin weten?','screen-module-2-2':'Claude Code schrijft alles','screen-module-2-kc':'Kennischeck','screen-module-3-1':'De plugin koppelen aan Claude','screen-module-3-2':'Plugin starten en verifiëren','screen-module-3-kc':'Kennischeck' -->
<!-- QUIZ_START -->
[
  {
    "vraag": "Wat is het kernverschil tussen een Connector en een plugin?",
    "opties": [
      "Connectors zijn gratis, plugins kosten extra",
      "Connectors koppelen Claude aan bestaande diensten van anderen, plugins koppelen Claude aan jouw eigen data",
      "Plugins zijn sneller dan Connectors",
      "Er is geen verschil, het zijn synoniemen"
    ],
    "correct": 1,
    "uitleg": "Een Connector is een koppeling die Anthropic heeft gebouwd voor bestaande diensten zoals Gmail of Notion. Een plugin bouw je zelf om Claude toegang te geven tot jouw eigen data die nergens anders staat."
  },
  {
    "vraag": "Wat genereert Claude Code in één opdracht voor je plugin?",
    "opties": [
      "Alleen de servercode",
      "De servercode en een gebruikershandleiding",
      "De servercode, een startscript en de exacte configuratieregel",
      "De servercode en een uploadscript voor Railway"
    ],
    "correct": 2,
    "uitleg": "Claude Code genereert drie dingen in één keer: de servercode (plugin.py), een startscript (start-plugin.bat) en de exacte configuratieregel die je in claude_desktop_config.json plakt. Je hoeft zelf niets te schrijven."
  },
  {
    "vraag": "Waarvoor dient claude_desktop_config.json?",
    "opties": [
      "Om je Claude-accountgegevens op te slaan",
      "Om Claude te vertellen welke plugins beschikbaar zijn en waar ze staan",
      "Om de plugin-code op te slaan",
      "Om de gesprekgeschiedenis te bewaren"
    ],
    "correct": 1,
    "uitleg": "claude_desktop_config.json is het configuratiebestand dat Claude bij het opstarten leest. Daarin staat welke plugins beschikbaar zijn en waar ze staan op je computer. Zonder die regel weet Claude niet dat je plugin bestaat."
  },
  {
    "vraag": "Waarom moet het terminalvenster open blijven nadat je start-plugin.bat hebt gestart?",
    "opties": [
      "Om te zien welke fouten er zijn",
      "Omdat de plugin actief is zolang dat venster open is",
      "Om de configuratieregel te kopiëren",
      "Het venster mag gewoon gesloten worden"
    ],
    "correct": 1,
    "uitleg": "De plugin draait als een actief proces in het terminalvenster. Zodra je dat venster sluit, stopt de plugin. Claude kan dan niet meer bij je data. Laat het venster open staan zolang je de plugin wilt gebruiken."
  },
  {
    "vraag": "Je hebt de plugin gestart en Claude herstart, maar Claude zegt dat hij de informatie niet kent. Wat is de eerste stap?",
    "opties": [
      "De plugin opnieuw bouwen met Claude Code",
      "Controleren of het terminalvenster van de plugin nog open is",
      "Claude.ai openen in de browser in plaats van de desktop-app",
      "De plugin verwijderen en opnieuw installeren"
    ],
    "correct": 1,
    "uitleg": "Als Claude de plugin niet herkent, is de meest voorkomende oorzaak dat het terminalvenster per ongeluk is gesloten. Controleer dat eerst. Als het venster open is, controleer dan of Claude na het toevoegen van de configuratieregel opnieuw is gestart."
  }
]
<!-- QUIZ_END -->
```

- [ ] **Stap 2: Verifieer dat de QUIZ_START/QUIZ_END aanwezig zijn en de JSON geldig is**

Open een JSON-validator (of plak de JSON in Claude) en controleer dat er geen syntaxfouten zijn.

- [ ] **Stap 3: Commit**

```bash
git add module-content/elearning-e3-plugin-bouwen.html
git commit -m "feat: E3 HTML skelet met quiz aangemaakt"
```

---

## Task 3: Welkomscherm

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg het welkomscherm toe na de QUIZ_END-comment**

```html
<div id="screen-welcome" class="screen start">
  <div class="welcome-badge">E3 — Je eerste plugin bouwen</div>
  <h1>Claude weet wat jij weet</h1>
  <p>Kant-en-klare Connectors koppelen Claude aan systemen van anderen. Een plugin koppelt Claude aan wat jij hebt: je eigen klantenlijst, je interne procedures, je eigen kennis.</p>
  <p>In deze module bouw je je eerste plugin — zonder code te schrijven.</p>
  <div class="leerdoelen">
    <h3>Na deze module kun je:</h3>
    <ul>
      <li>Uitleggen wat het verschil is tussen een Connector en een plugin</li>
      <li>Aan Claude Code beschrijven wat je plugin moet doen</li>
      <li>De gegenereerde plugin starten via een startscript</li>
      <li>De plugin koppelen aan Claude via het configuratiebestand</li>
      <li>Verifiëren of Claude de plugin correct gebruikt</li>
    </ul>
  </div>
  <div class="tijdsbadge">± 20 minuten</div>
</div>
```

---

## Task 4: Scherm 1-1 — Connector vs. plugin + SVG

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg scherm 1-1 toe**

```html
<div id="screen-module-1-1" class="screen">
  <div class="module-header">Connector vs. plugin: wat is het verschil?</div>

  <div class="content-card">
    <p>In E2 heb je geleerd hoe je een Connector inschakelt. Een Connector is een koppeling die Anthropic heeft gebouwd: jij schakelt hem in, en Claude kan daarna Gmail, je agenda of Notion gebruiken.</p>
    <p>Een plugin werkt anders. Jij bouwt de koppeling zelf — maar Claude Code schrijft de code voor je. Het enige wat jij doet: beschrijven wat Claude moet kunnen opzoeken.</p>
  </div>

  <div class="vergelijk-tabel">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Connector</th>
          <th>Plugin</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Wie bouwt het?</strong></td>
          <td>Anthropic</td>
          <td>Jij (met Claude Code)</td>
        </tr>
        <tr>
          <td><strong>Welke data?</strong></td>
          <td>Bestaande diensten (Gmail, agenda)</td>
          <td>Jouw eigen data</td>
        </tr>
        <tr>
          <td><strong>Hoe inschakelen?</strong></td>
          <td>Klik in Claude-instellingen</td>
          <td>Configuratiebestand + startscript</td>
        </tr>
        <tr>
          <td><strong>Wanneer gebruiken?</strong></td>
          <td>Als de Connector al bestaat</td>
          <td>Als jouw data nergens anders staat</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="visual-block">
    <svg viewBox="0 0 580 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:10px;box-shadow:0 2px 16px rgba(0,0,0,0.09);">
      <!-- Achtergrond -->
      <rect width="580" height="220" fill="#FFF8F2" rx="10"/>

      <!-- Claude (midden) -->
      <rect x="230" y="80" width="120" height="60" rx="8" fill="#27292D"/>
      <text x="290" y="107" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#FFF8F2" font-weight="bold">Claude</text>
      <text x="290" y="125" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#FF8514">desktop-app</text>

      <!-- Links: Connector -->
      <rect x="30" y="85" width="110" height="50" rx="8" fill="#EAE6E0"/>
      <text x="85" y="107" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#27292D" font-weight="bold">Gmail / Notion</text>
      <text x="85" y="123" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666">Connector</text>
      <!-- Pijl links -->
      <line x1="140" y1="110" x2="228" y2="110" stroke="#27292D" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="184" y="104" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#666">Anthropic gebouwd</text>

      <!-- Rechts: Plugin -->
      <rect x="440" y="85" width="110" height="50" rx="8" fill="#FF8514" opacity="0.15"/>
      <rect x="440" y="85" width="110" height="50" rx="8" fill="none" stroke="#FF8514" stroke-width="2"/>
      <text x="495" y="107" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#27292D" font-weight="bold">Jouw data</text>
      <text x="495" y="123" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#FF8514">Plugin</text>
      <!-- Pijl rechts -->
      <line x1="440" y1="110" x2="352" y2="110" stroke="#FF8514" stroke-width="2" marker-end="url(#arrow-orange)"/>
      <text x="396" y="104" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#FF8514">jij gebouwd</text>

      <!-- Labels boven -->
      <text x="85" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#27292D">Andermans systeem</text>
      <text x="495" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#FF8514" font-weight="bold">Jouw systeem</text>

      <!-- Pijlpunten -->
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#27292D"/>
        </marker>
        <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#FF8514"/>
        </marker>
      </defs>
    </svg>
  </div>

  <div class="tip-box">
    <strong>Wanneer gebruik je welk?</strong><br>
    Connector: als de tool al bestaat als Connector (Gmail, agenda, Slack).<br>
    Plugin: als je eigen data wilt ontsluiten die nergens anders staat.
  </div>
</div>
```

---

## Task 5: Kennischeck 1

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg kennischeck 1 toe**

```html
<div id="screen-module-1-kc" class="screen">
  <div class="module-header">Kennischeck</div>
  <div class="kennischeck" id="kc1">
    <p class="kc-vraag">Een advocatenkantoor wil dat Claude hun eigen dossiersysteem kan raadplegen. Welke optie is het meest geschikt?</p>
    <div class="kc-opties">
      <button onclick="checkKC(1, this, false, 'screen-module-2-1', 'Een Connector koppelt Claude aan bestaande diensten van anderen. Een eigen dossiersysteem is jouw data — daar is een plugin voor nodig.')">Een Connector inschakelen via de Claude-instellingen</button>
      <button onclick="checkKC(1, this, true, 'screen-module-2-1', 'Precies. Het eigen dossiersysteem is data die nergens als Connector beschikbaar is. Een plugin koppelt Claude aan jouw eigen data.')">Een eigen plugin bouwen met Claude Code</button>
      <button onclick="checkKC(1, this, false, 'screen-module-2-1', 'Dat klopt niet. Connectors bestaan voor diensten zoals Gmail en Notion, niet voor elk willekeurig systeem. Een eigen dossiersysteem vereist een plugin.')">Wachten tot Anthropic een Connector bouwt voor hun systeem</button>
    </div>
    <div id="kc1-reset" style="display:none"><button class="reset-btn" onclick="resetKC(1)">Opnieuw proberen</button></div>
  </div>
</div>
```

---

## Task 6: Scherm 2-1 en 2-2

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg scherm 2-1 toe**

```html
<div id="screen-module-2-1" class="screen">
  <div class="module-header">Wat gaat jouw plugin weten?</div>

  <div class="content-card">
    <p>Voordat je Claude Code instrueert, bepaal je wat je plugin moet weten. Schrijf dit op in gewone taal — dat wordt je prompt.</p>
  </div>

  <div class="flashcard-set">
    <p><strong>Voorbeelden per sector — klik om te zien wat je kunt beschrijven:</strong></p>

    <div class="flashcard" onclick="toggleFlashcard(this)">
      <div class="flashcard-front">Makelaarskantoor</div>
      <div class="flashcard-back">Lijst van actieve woningen met adres, vraagprijs en status (beschikbaar / onder bod / verkocht). Claude kan dan direct antwoorden op vragen als: "Welke woningen staan er momenteel te koop onder de 400.000 euro?"</div>
    </div>

    <div class="flashcard" onclick="toggleFlashcard(this)">
      <div class="flashcard-front">Advocatenkantoor</div>
      <div class="flashcard-back">Overzicht van lopende zaken met partijen, deadlines en dossiernummer. Claude kan dan helpen bij vragen als: "Welke zaken hebben een deadline deze maand?"</div>
    </div>

    <div class="flashcard" onclick="toggleFlashcard(this)">
      <div class="flashcard-front">Marketingbureau</div>
      <div class="flashcard-back">Tone-of-voice per klant, merkwaarden en verboden woorden. Claude schrijft daarna automatisch in de stijl van elke klant zonder dat je het telkens hoeft uit te leggen.</div>
    </div>

    <div class="flashcard" onclick="toggleFlashcard(this)">
      <div class="flashcard-front">Accountant</div>
      <div class="flashcard-back">Vaste tarieven per dienst en servicepakketten. Claude kan offertes opstellen en vragen over prijzen direct beantwoorden.</div>
    </div>
  </div>

  <div class="tip-box">
    <strong>Hoe specifieker, hoe beter.</strong><br>
    "Klantinformatie" is te vaag. "Namen van actieve klanten, hun sector en de contactpersoon" is concreet — Claude weet precies wat hij kan opzoeken.
  </div>
</div>
```

- [ ] **Stap 2: Voeg scherm 2-2 toe**

```html
<div id="screen-module-2-2" class="screen">
  <div class="module-header">Claude Code schrijft alles</div>

  <div class="content-card">
    <p>Open Claude Code en gebruik onderstaande prompttemplate. Vervang het middelste deel door jouw eigen beschrijving uit het vorige scherm.</p>
  </div>

  <div class="stappen-lijst">
    <div class="stap-item">
      <div class="stap-nummer">1</div>
      <div class="stap-inhoud">
        <strong>Open Claude Code in je projectmap</strong>
        <p>Maak een nieuwe map aan voor je plugin, bijvoorbeeld <code>mijn-plugin</code>. Open Claude Code daarin.</p>
      </div>
    </div>
    <div class="stap-item">
      <div class="stap-nummer">2</div>
      <div class="stap-inhoud">
        <strong>Gebruik deze prompttemplate</strong>
        <div class="content-card" style="background:#F5F0EB;font-family:monospace;font-size:13px;white-space:pre-wrap;">Maak een MCP-server in Python die Claude toegang geeft tot de volgende informatie:

[beschrijf hier in gewone taal wat Claude moet kunnen opzoeken]

Genereer drie bestanden:
1. De servercode als plugin.py
2. Een startscript start-plugin.bat voor Windows
3. De exacte tekst die ik moet toevoegen aan claude_desktop_config.json, inclusief het volledige pad naar plugin.py

Gebruik de officiële MCP Python SDK. Als Python niet beschikbaar is, gebruik dan Node.js.</div>
      </div>
    </div>
    <div class="stap-item">
      <div class="stap-nummer">3</div>
      <div class="stap-inhoud">
        <strong>Sla de drie bestanden op in je pluginmap</strong>
        <p>Claude Code genereert plugin.py, start-plugin.bat en de configuratietekst. Zorg dat alle drie in dezelfde map staan.</p>
      </div>
    </div>
  </div>

  <div class="tip-box waarschuwing">
    <strong>Onthoud het pad naar je pluginmap.</strong><br>
    Bijvoorbeeld: <code>C:\Users\jan\Documenten\mijn-plugin\</code><br>
    Je hebt dit pad nodig in de volgende stap.
  </div>
</div>
```

---

## Task 7: Kennischeck 2

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg kennischeck 2 toe**

```html
<div id="screen-module-2-kc" class="screen">
  <div class="module-header">Kennischeck</div>
  <div class="kennischeck" id="kc2">
    <p class="kc-vraag">Waarom vraagt de prompttemplate aan Claude Code om drie bestanden te genereren in plaats van één?</p>
    <div class="kc-opties">
      <button onclick="checkKC(2, this, false, 'screen-module-3-1', 'Eén bestand zou technisch ook kunnen, maar dat is niet de reden. Elk bestand heeft een eigen specifieke functie in het proces.')">Dat is een technische beperking van Claude Code</button>
      <button onclick="checkKC(2, this, true, 'screen-module-3-1', 'Precies. De servercode draait de plugin, het startscript start hem met één dubbelklik, en de configuratieregel vertelt Claude waar de plugin staat. Zonder één van die drie werkt het niet.')">Elk bestand heeft een andere functie: servercode draait de plugin, startscript start hem, configuratieregel vertelt Claude waar hij staat</button>
      <button onclick="checkKC(2, this, false, 'screen-module-3-1', 'Nee, twee bestanden is niet voldoende. Je hebt alle drie nodig: de servercode, het startscript én de configuratieregel.')">Twee bestanden zijn voldoende, het derde is optioneel</button>
    </div>
    <div id="kc2-reset" style="display:none"><button class="reset-btn" onclick="resetKC(2)">Opnieuw proberen</button></div>
  </div>
</div>
```

---

## Task 8: Scherm 3-1 — Koppelen (kritieke stap)

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg scherm 3-1 toe**

```html
<div id="screen-module-3-1" class="screen">
  <div class="module-header">De plugin koppelen aan Claude</div>

  <div class="content-card">
    <p>Je vertelt Claude waar de plugin staat via een configuratiebestand. Claude leest dat bestand bij het opstarten en weet daarna welke plugins beschikbaar zijn.</p>
  </div>

  <div class="stappen-lijst">
    <div class="stap-item">
      <div class="stap-nummer">1</div>
      <div class="stap-inhoud">
        <strong>Configuratiebestand openen</strong>
        <p>Het bestand staat op:</p>
        <div class="content-card" style="background:#F5F0EB;font-family:monospace;font-size:13px;">C:\Users\[jouwgebruikersnaam]\AppData\Roaming\Claude\claude_desktop_config.json</div>
        <p style="margin-top:8px">Open het in Kladblok of VS Code. Bestaat het bestand niet? Maak het aan en zet er alleen <code>{}</code> in.</p>
      </div>
    </div>

    <div class="stap-item">
      <div class="stap-nummer">2</div>
      <div class="stap-inhoud">
        <strong>Configuratieregel toevoegen</strong>
        <p>Claude Code heeft de exacte tekst al gegenereerd. Kopieer die tekst volledig en vervang de inhoud van het configuratiebestand ermee.</p>
        <p><strong>Zo ziet het bestand eruit vóór en na de wijziging:</strong></p>
        <div class="vergelijk-tabel">
          <table>
            <thead>
              <tr><th>Vóór</th><th>Na</th></tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-family:monospace;font-size:12px;vertical-align:top">{}</td>
                <td style="font-family:monospace;font-size:12px;vertical-align:top">{<br>&nbsp;&nbsp;"mcpServers": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"mijn-plugin": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "python",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["C:\\Users\\jan\\mijn-plugin\\plugin.py"]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="stap-item">
      <div class="stap-nummer">3</div>
      <div class="stap-inhoud">
        <strong>Opslaan en Claude herstarten</strong>
        <p>Sla het bestand op. Sluit de Claude desktop-app volledig (ook uit het systeemvak). Open Claude opnieuw.</p>
      </div>
    </div>
  </div>

  <div class="tip-box waarschuwing">
    <strong>JSON is gevoelig voor fouten.</strong><br>
    Als er een komma of haakje mist, start Claude niet correct op. Als dat gebeurt: open Claude Code en vraag "Mijn configuratiebestand geeft een fout. Dit is de inhoud: [plak de inhoud]. Wat klopt er niet?" Claude Code lost het op.
  </div>
</div>
```

---

## Task 9: Scherm 3-2 — Starten en verifiëren

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg scherm 3-2 toe**

```html
<div id="screen-module-3-2" class="screen">
  <div class="module-header">Plugin starten en verifiëren</div>

  <div class="stappen-lijst">
    <div class="stap-item">
      <div class="stap-nummer">1</div>
      <div class="stap-inhoud">
        <strong>Plugin starten</strong>
        <p>Ga naar je pluginmap en dubbelklik <code>start-plugin.bat</code>. Een terminalvenster opent. <strong>Laat dat venster open</strong> — de plugin draait zolang het venster open is.</p>
      </div>
    </div>

    <div class="stap-item">
      <div class="stap-nummer">2</div>
      <div class="stap-inhoud">
        <strong>Testen</strong>
        <p>Open Claude en stel een vraag over informatie die alleen in jouw plugin staat. Bijvoorbeeld:</p>
        <ul>
          <li>"Welke woningen staan er actief in ons systeem?"</li>
          <li>"Wat zijn onze tarieven voor belastingaangifte?"</li>
          <li>"Wat zijn de tone-of-voice regels voor klant X?"</li>
        </ul>
        <p>Als Claude antwoordt met informatie uit je plugin: gelukt.</p>
      </div>
    </div>
  </div>

  <div class="scenario-blok" id="scenario-herstel">
    <p class="scenario-vraag"><strong>Claude zegt dat hij de informatie niet kent. Wat doe je?</strong></p>
    <div class="scenario-opties">
      <button class="scenario-keuze" onclick="checkScenario(1, this, false, 'Controleer eerst of het terminalvenster nog open is — dat is de meest voorkomende oorzaak. Daarna pas verdere stappen.')">
        De plugin opnieuw bouwen met Claude Code
      </button>
      <button class="scenario-keuze" onclick="checkScenario(1, this, true, 'Juist. Controleer in deze volgorde: (1) is het terminalvenster open? (2) is Claude herstart nadat je de configuratieregel hebt toegevoegd? (3) klopt de configuratieregel — vraag het aan Claude Code.')">
        Controleren of het terminalvenster open is, dan of Claude is herstart, dan de configuratieregel controleren via Claude Code
      </button>
      <button class="scenario-keuze" onclick="checkScenario(1, this, false, 'claude.ai in de browser gebruikt een andere configuratie dan de desktop-app. De plugin werkt alleen in de desktop-app via claude_desktop_config.json.')">
        claude.ai openen in de browser in plaats van de desktop-app
      </button>
    </div>
  </div>

  <div class="tip-box">
    <strong>Naar de afsluitquiz</strong><br>
    Je hebt je eerste plugin gebouwd, gekoppeld en getest. Sluit af met de quiz.
    <br><br>
    <button onclick="goTo('screen-quiz')" class="btn-primary">Naar de quiz</button>
  </div>
</div>
```

---

## Task 10: Kennischeck 3

**Files:**
- Modify: `module-content/elearning-e3-plugin-bouwen.html`

- [ ] **Stap 1: Voeg kennischeck 3 toe**

```html
<div id="screen-module-3-kc" class="screen">
  <div class="module-header">Kennischeck</div>
  <div class="kennischeck" id="kc3">
    <p class="kc-vraag">Je hebt de plugin gestart en Claude herstart, maar Claude geeft antwoorden alsof de plugin niet bestaat. Je controleert het terminalvenster — dat is open. Wat is de volgende stap?</p>
    <div class="kc-opties">
      <button onclick="checkKC(3, this, false, 'screen-module-3-2', 'Nog niet nodig. Controleer eerst of de configuratieregel correct is — dat is eenvoudiger en lost het probleem vaker op dan opnieuw bouwen.')">De plugin opnieuw bouwen met een nieuwe prompt aan Claude Code</button>
      <button onclick="checkKC(3, this, true, 'screen-module-3-2', 'Juist. Het terminalvenster is open, dus de plugin draait. De meest waarschijnlijke oorzaak is nu een fout in de configuratieregel. Claude Code kan die controleren en corrigeren.')">Claude Code vragen de configuratieregel te controleren</button>
      <button onclick="checkKC(3, this, false, 'screen-module-3-2', 'De plugin werkt alleen in de Claude desktop-app via claude_desktop_config.json. claude.ai in de browser leest dat bestand niet.')">claude.ai openen in de browser om te testen of het daar wel werkt</button>
    </div>
    <div id="kc3-reset" style="display:none"><button class="reset-btn" onclick="resetKC(3)">Opnieuw proberen</button></div>
  </div>
</div>
```

---

## Task 11: Build en checklist-verificatie

**Files:**
- Run: `node build-modules.js`
- Check: `output/elearning-e3-plugin-bouwen-*.html`

- [ ] **Stap 1: Run build**

```bash
cd "C:\Users\davem\OneDrive\AI Space\Umely\umely-elearning-generator"
node build-modules.js
```

Verwacht: `output/elearning-e3-plugin-bouwen-[datum].html` aangemaakt zonder fouten.

- [ ] **Stap 2: Open de output in de browser en doorloop de upload-checklist**

Open `output/elearning-e3-plugin-bouwen-*.html` in Chrome.

```
Upload-checklist:
[ ] class="screen start" aanwezig op welkomscherm
[ ] welcome-badge aanwezig
[ ] leerdoelen aanwezig als <ul>
[ ] tijdsbadge aanwezig
[ ] MODULE_TITELS allemaal beschrijvend (geen "Module 1")
[ ] Kennischecks op eigen -kc schermen (3 stuks)
[ ] Geen inline navigatieknoppen in contentschermen
[ ] Quiz aanwezig met 5 vragen elk met uitleg-veld
[ ] Geen prijsbedragen of tijdsgebonden claims
[ ] Minimaal 5 componenttypen aanwezig
[ ] Flashcards hebben onclick="toggleFlashcard(this)"
[ ] SVG illustratie zichtbaar en correct
[ ] Vóór/na tabel configuratiebestand zichtbaar
[ ] Scenario-blok herstelstap klikbaar
```

- [ ] **Stap 3: Doorloop de module volledig in de browser**

Klik van scherm naar scherm, beantwoord kennischecks, maak de quiz. Controleer dat navigatie klopt en geen scherm overgeslagen wordt.

- [ ] **Stap 4: Commit**

```bash
git add module-content/elearning-e3-plugin-bouwen.html
git commit -m "feat: E3 plugin bouwen module compleet"
```

---

## Task 12: CLAUDE.md bijwerken en uploaden

**Files:**
- Modify: `CLAUDE.md` (module toevoegen aan lijst)
- Run: `node upload-modules.js`

- [ ] **Stap 1: Voeg de nieuwe module toe aan de modulelijst in CLAUDE.md**

Voeg toe na de regel `elearning-e3-plugins`:

```markdown
| elearning-e3-plugin-bouwen | E3b - Je eerste plugin bouwen |
```

- [ ] **Stap 2: Upload naar Supabase**

```bash
node upload-modules.js
```

Verwacht: `Uploaded: elearning-e3-plugin-bouwen` zonder fouten.

- [ ] **Stap 3: Verifieer in Supabase**

Via Supabase MCP (project_id: `dsxyygvvtwnsoiubrwxc`):

```sql
SELECT slug, title, created_at
FROM elearning.modules
WHERE slug = 'elearning-e3-plugin-bouwen';
```

Verwacht: één rij met de juiste slug en titel.

- [ ] **Stap 4: Test in de webapp**

Log in op de webapp en open de module via de modulebibliotheek. Controleer dat alle schermen laden, de navigatie werkt en de quiz correct scoort.

- [ ] **Stap 5: Commit**

```bash
git add CLAUDE.md
git commit -m "feat: E3 plugin module toegevoegd aan modulelijst en geüpload"
```

---

## Zelfcontrole na implementatie

Na het afronden, controleer:
- [ ] Alle 5 quiz-vragen hebben een inhoudelijk `uitleg`-veld
- [ ] De SVG-illustratie gebruikt alleen Umely-kleuren (`#27292D`, `#FF8514`, `#FFF8F2`, `#EAE6E0`)
- [ ] Geen m-dashes in de tekst
- [ ] Geen tijdsgebonden taal ("op dit moment", "binnenkort")
- [ ] Elke waarschuwing heeft een concrete vervolgstap
