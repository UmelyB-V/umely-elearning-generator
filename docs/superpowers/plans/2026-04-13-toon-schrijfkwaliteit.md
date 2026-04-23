# Toon- en schrijfkwaliteitscheck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alle 32 e-learning modules scannen op AI-opvulling, vage platitudes, tijdsgebonden taal en inconsistent taalgebruik, elke gevonden issue direct fixen, en afsluiten met een cross-module consistentiecheck.

**Architecture:** Elke taak behandelt één reeks modules. Per module: lees volledig, identificeer issues op basis van de vier criteria, fix direct in de HTML, documenteer in content-audit.md. Slottaak controleert consistentie over alle modules heen.

**Tech Stack:** HTML-bestanden in `module-content/`, `content-audit.md` als auditlog, Git voor commits.

---

## Vier criteria (referentie voor elke taak)

### 1. AI-opvulling
Zinnen die niets concreets toevoegen:
- "Blijf experimenteren, blijf testen"
- "Mogelijkheden zijn eindeloos"
- "Gebruik Claude verstandig"
- "Claude is een krachtige tool"
- "AI verandert snel"
- Opsommingen van ontkennende claims zonder concrete vervolgstap

**Fix:** verwijder de zin, of vervang door een concrete handeling/voorbeeld.

### 2. Vage platitudes
Uitspraken die iets zeggen zonder te vertellen hoe of waarom:
- "Controleer altijd wat Claude produceert" (zonder: wát controleer je, hoe, aan de hand van welk criterium)
- "Wees kritisch" (zonder concrete handelswijze)
- Waarschuwingen die eindigen zonder vervolgstap

**Fix:** voeg concrete handeling toe ("controleer X via Y") of verwijder als het geen informatie toevoegt.

### 3. Tijdsgebonden taal
- "Op dit moment", "momenteel", "op het moment van schrijven"
- "Binnenkort", "in ontwikkeling", "wordt uitgebreid"
- "Nieuwste versie", "huidige versie", "actuele versie"
- Concrete prijzen (€XX/mnd, $XX, ~$20)
- Concrete getallen die verouderen (limieten, aantal connectoren)
- Datums, jaren, kwartalen

**Fix:** herformuleer tijdloos, of verwijs naar de actuele bron (bijv. "zie claude.ai/pricing").

### 4. Inconsistent taalgebruik
- Wisselend "je/jij" ↔ "u" (gebruik altijd "je/jij")
- Wisselende naamgeving: "Projects" vs "projecten", "Connectors" vs "connectors", "Claude Code" vs "claude code"
- Inconsistente omschrijving van dezelfde UI-elementen
- Wisselende kommatisering in opsommingen

**Fix:** kies de dominante stijl binnen de module en pas de afwijkende instanties aan. Technische eigennamen altijd zoals Anthropic ze schrijft: "Claude", "Projects", "Connectors", "MCP", "Claude Code".

---

## Bestandsoverzicht

| Bestand | Taak |
|---|---|
| `module-content/elearning-a1-wat-is-claude.html` | Taak 1 |
| `module-content/elearning-a2-ecosysteem.html` | Taak 1 |
| `module-content/elearning-a3-prompts.html` | Taak 1 |
| `module-content/elearning-a4-leeropdracht-a.html` | Taak 1 |
| `module-content/elearning-b1-veiligheid.html` | Taak 2 |
| `module-content/elearning-b2-niet-developers.html` | Taak 2 |
| `module-content/elearning-b3-fouten.html` | Taak 2 |
| `module-content/elearning-b4-leeropdracht-b.html` | Taak 2 |
| `module-content/elearning-c1-webapp.html` | Taak 3 |
| `module-content/elearning-c2-desktop.html` | Taak 3 |
| `module-content/elearning-c3-chrome.html` | Taak 3 |
| `module-content/elearning-c4-cowork.html` | Taak 3 |
| `module-content/elearning-c5-excel-powerpoint.html` | Taak 3 |
| `module-content/elearning-c6-settings.html` | Taak 3 |
| `module-content/elearning-c7-organisatie.html` | Taak 3 |
| `module-content/elearning-c8-leeropdracht-c.html` | Taak 3 |
| `module-content/elearning-d1-wanneer-meer.html` | Taak 4 |
| `module-content/elearning-d2-claude-code.html` | Taak 4 |
| `module-content/elearning-d3-claude-md.html` | Taak 4 |
| `module-content/elearning-d4-plan-mode.html` | Taak 4 |
| `module-content/elearning-d5-leeropdracht-d.html` | Taak 4 |
| `module-content/elearning-e1-mcp.html` | Taak 5 |
| `module-content/elearning-e2-connectors.html` | Taak 5 |
| `module-content/elearning-e3-plugins.html` | Taak 5 |
| `module-content/elearning-e4-skills.html` | Taak 5 |
| `module-content/elearning-e5-eerste-skill.html` | Taak 5 |
| `module-content/elearning-e6-agentic-workflows.html` | Taak 5 |
| `module-content/elearning-e7-portfolio-website.html` | Taak 5 |
| `module-content/elearning-e8-leeropdracht-e.html` | Taak 5 |
| `module-content/elearning-i0-eindopdracht.html` | Taak 6 |
| `module-content/elearning-i1-praktijktoets.html` | Taak 6 |
| `module-content/elearning-i2-certificaat.html` | Taak 6 |
| `content-audit.md` | Alle taken + Taak 7 |

---

## Werkwijze per module (zelfde patroon voor elke stap)

Voor elke module:
1. Lees het volledige HTML-bestand
2. Scan op de vier criteria — noteer per bevinding: scherm-ID, exacte zin, type probleem, fix
3. Pas alle fixes toe direct in het bestand
4. Voeg bevindingen toe aan `content-audit.md` onder de juiste module-header (vervang verouderde entries)

---

## Taak 1: A-reeks

**Bestanden:**
- Modify: `module-content/elearning-a1-wat-is-claude.html`
- Modify: `module-content/elearning-a2-ecosysteem.html`
- Modify: `module-content/elearning-a3-prompts.html`
- Modify: `module-content/elearning-a4-leeropdracht-a.html`
- Modify: `content-audit.md`

- [ ] **Stap 1: Scan en fix elearning-a1-wat-is-claude.html**

  Lees het volledige bestand. Bekende issues uit vorige audit (controleer of ze al zijn opgelost):
  - `screen-module-2-3`: tip-box "Controleer altijd wat Claude produceert" zonder concrete handeling → toevoegen: wát je controleert (feiten, cijfers, namen) en hoe (vergelijk met primaire bron)
  - `screen-module-1-2`: "Over drie maanden verbeterd zijn" → tijdloos: "Blijf testen — Anthropic brengt regelmatig updates uit"
  - Quiz-antwoordoptie: "Technische beperking die binnenkort opgelost wordt" → "Technische beperking van het huidige model"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 2: Scan en fix elearning-a2-ecosysteem.html**

  Bekende issues:
  - `screen-module-1-1`: "Controleer de actuele prijs op claude.ai" → "Zie claude.ai/pricing voor actuele abonnementsprijzen"
  - `screen-module-4-1`: tip-box "Bekijk de actuele mogelijkheden via de Microsoft 365-instellingen" → specificeer: "Ga naar claude.ai > Settings > Integrations voor beschikbare koppelingen"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 3: Scan en fix elearning-a3-prompts.html**

  Geen bekende issues. Scan volledig op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 4: Scan en fix elearning-a4-leeropdracht-a.html**

  Nieuwe module — nog niet geaudit. Scan volledig op alle vier criteria. Let extra op:
  - Tijdsgebonden instructies in de use case-invoervelden
  - AI-opvulling in intro- of afsluitteksten
  - Inconsistente naamgeving voor de use case ("use case", "opdracht", "jouw taak" — kies één term)

  Fix elke gevonden issue direct.

- [ ] **Stap 5: Documenteer in content-audit.md**

  Vervang de A-reeks entries in `content-audit.md` met actuele bevindingen. Formaat:

  ```markdown
  ## MODULE: elearning-a1-wat-is-claude.html

  - **[scherm-ID]**: [type] — exacte zin: `"..."` — Fix: [wat er is veranderd]

  (of: Geen bevindingen.)
  ```

- [ ] **Stap 6: Commit A-reeks**

  ```bash
  cd "c:/Users/davem/OneDrive/AI Space/Umely/umely-elearning-generator"
  git add module-content/elearning-a1-wat-is-claude.html module-content/elearning-a2-ecosysteem.html module-content/elearning-a3-prompts.html module-content/elearning-a4-leeropdracht-a.html content-audit.md
  git commit -m "content: schrijfkwaliteitsfix A-reeks — AI-opvulling, tijdsgebonden taal, platitudes"
  ```

---

## Taak 2: B-reeks

**Bestanden:**
- Modify: `module-content/elearning-b1-veiligheid.html`
- Modify: `module-content/elearning-b2-niet-developers.html`
- Modify: `module-content/elearning-b3-fouten.html`
- Modify: `module-content/elearning-b4-leeropdracht-b.html`
- Modify: `content-audit.md`

- [ ] **Stap 1: Scan en fix elearning-b1-veiligheid.html**

  Bekende issues:
  - `screen-module-2-2`: concrete tarieven in tabel (`~$20/mnd`, `~$25/gebruiker/mnd`) → verwijder bedragen, vervang door "zie claude.ai/pricing"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 2: Scan en fix elearning-b2-niet-developers.html**

  Bekende issues:
  - `screen-module-1-1`: lege `<div class="content-card"></div>` tussen twee tip-boxes → verwijder de lege div of vul met inhoud
  - `screen-module-3-1`: "Zijn kennis heeft ook een einddatum" zonder handelingsperspectief → voeg toe: "Als je vermoedt dat de info verouderd is: vraag Claude naar zijn trainingsdatum, of zoek de actuele informatie op via de officiële bron"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 3: Scan en fix elearning-b3-fouten.html**

  Bekende issues:
  - `screen-module-4-3`: rij ontkennende claims ("Claude is geen zoekmachine", "geen jurist", "geen arts") zonder concrete handeling per beroepscontext → voeg per claim een concrete handeling toe (bijv. voor juridische context: "Gebruik Claude voor het begrijpen van wetgevingsteksten — verifieer conclusies altijd met een gecertificeerde jurist")
  - `screen-module-1-1`: "Dit geldt voor Claude, ChatGPT, Gemini" — beoordeel of namen van andere tools hier functioneel zijn (feitelijke context) of vergelijkend. Als vergelijkend: vervang door "alle grote taalmodellen"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 4: Scan en fix elearning-b4-leeropdracht-b.html**

  Nieuwe module — nog niet geaudit. Scan volledig op alle vier criteria. Let extra op:
  - Privacy-gerelateerde waarschuwingen zonder concrete handeling
  - Tijdsgebonden privacyclaims
  - Consistentie in naamgeving van privacyconcepten t.o.v. B1

  Fix elke gevonden issue direct.

- [ ] **Stap 5: Documenteer in content-audit.md**

  Vervang de B-reeks entries in `content-audit.md` met actuele bevindingen.

- [ ] **Stap 6: Commit B-reeks**

  ```bash
  git add module-content/elearning-b1-veiligheid.html module-content/elearning-b2-niet-developers.html module-content/elearning-b3-fouten.html module-content/elearning-b4-leeropdracht-b.html content-audit.md
  git commit -m "content: schrijfkwaliteitsfix B-reeks — tijdsgebonden tarieven, lege content-card, platitudes zonder handelingsperspectief"
  ```

---

## Taak 3: C-reeks

**Bestanden:**
- Modify: `module-content/elearning-c1-webapp.html`
- Modify: `module-content/elearning-c2-desktop.html`
- Modify: `module-content/elearning-c3-chrome.html`
- Modify: `module-content/elearning-c4-cowork.html`
- Modify: `module-content/elearning-c5-excel-powerpoint.html`
- Modify: `module-content/elearning-c6-settings.html`
- Modify: `module-content/elearning-c7-organisatie.html`
- Modify: `module-content/elearning-c8-leeropdracht-c.html`
- Modify: `content-audit.md`

- [ ] **Stap 1: Scan en fix elearning-c1-webapp.html**

  Bekende issues:
  - `screen-module-4-3`: "De actuele privacyvoorwaarden kennen" zonder handleiding → voeg toe: "Ga naar claude.ai > Settings > Privacy. Controleer of 'Use my data to improve Claude' uitstaat"
  - `screen-module-4-kc`: quiz-feedback "Controleer altijd de actuele privacyvoorwaarden" → "Ga naar claude.ai > Settings > Privacy om je instellingen te controleren"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 2: Scan en fix elearning-c2-desktop.html**

  Bekende issues:
  - `screen-module-3-1`: grammaticale fout "geef jij het antwoord uit" → "Bij Chat geeft Claude een antwoord en voer jij de actie zelf uit"
  - `screen-module-3-3`: kapotte onclick door aanhalingstekens in knooptekst → vervang binnenste aanhalingstekens door `&quot;` of gebruik `'` consistent

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 3: Scan en fix elearning-c3-chrome.html**

  Geen bekende issues. Scan volledig op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 4: Scan en fix elearning-c4-cowork.html**

  Bekende issues:
  - `screen-module-3`: tabelcel "beperkt web mogelijk via browserfunctie" — ofwel uitleggen (één zin: hoe schakel je die browserfunctie in, wat zijn de beperkingen), ofwel de toevoeging verwijderen en de beperking als absoluut presenteren

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 5: Scan en fix elearning-c5-excel-powerpoint.html**

  Bekende issues:
  - `screen-welcome`: leerdoel "Weten dat directe Office-integraties in ontwikkeling zijn" → "Weten waarom de copy-paste werkwijze altijd werkt, ongeacht toekomstige integraties"
  - Quiz-vraag 4: antwoordoptie met "Microsoft 365 Copilot gebruikt een ander AI-model" — als dit veroudert bij samenwerking Copilot-Claude, herformuleer naar: "Claude gebruik je naast Office via copy-paste — er is geen directe ingebouwde koppeling"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 6: Scan en fix elearning-c6-settings.html**

  Bekende issues (marginaal):
  - `screen-module-1-2` en `screen-module-4-2`: "huidig abonnement" → "je abonnement" (verwijdert impliciete tijdsbinding)

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 7: Scan en fix elearning-c7-organisatie.html**

  Bekende issues:
  - `screen-module-2` en `screen-module-4`: exacte frase "Als collega's zien dat een taak van een uur nu tien minuten duurt, volgt adoptie vanzelf" staat op twee schermen → verwijder de herhaling op één van beide schermen
  - `screen-module-1` (kennischeck feedback): foutantwoord "Enterprise" mist reden waarom Enterprise wél nuttig is → voeg toe: "Enterprise voegt SSO en auditlogs toe — voor grotere of strikter gereguleerde kantoren kan dat een vereiste zijn"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 8: Scan en fix elearning-c8-leeropdracht-c.html**

  Nieuwe module — nog niet geaudit. Scan volledig op alle vier criteria. Let extra op:
  - Consistentie met C-reeks terminologie (Settings, Billing, Projects)
  - Tijdsgebonden UI-paden

  Fix elke gevonden issue direct.

- [ ] **Stap 9: Documenteer in content-audit.md**

  Vervang de C-reeks entries in `content-audit.md` met actuele bevindingen.

- [ ] **Stap 10: Commit C-reeks**

  ```bash
  git add module-content/elearning-c1-webapp.html module-content/elearning-c2-desktop.html module-content/elearning-c3-chrome.html module-content/elearning-c4-cowork.html module-content/elearning-c5-excel-powerpoint.html module-content/elearning-c6-settings.html module-content/elearning-c7-organisatie.html module-content/elearning-c8-leeropdracht-c.html content-audit.md
  git commit -m "content: schrijfkwaliteitsfix C-reeks — tijdsgebonden leerdoelen, HTML-fout C2, platitudes, woordherhaling C7"
  ```

---

## Taak 4: D-reeks

**Bestanden:**
- Modify: `module-content/elearning-d1-wanneer-meer.html`
- Modify: `module-content/elearning-d2-claude-code.html`
- Modify: `module-content/elearning-d3-claude-md.html`
- Modify: `module-content/elearning-d4-plan-mode.html`
- Modify: `module-content/elearning-d5-leeropdracht-d.html`
- Modify: `content-audit.md`

- [ ] **Stap 1: Scan en fix elearning-d1-wanneer-meer.html**

  Nieuwe module (hernummerd) — scan volledig op alle vier criteria. Let extra op:
  - Tijdsgebonden claims over Claude-functies ("beschikbaar via...")
  - AI-opvulling in intro/outro
  - Consistente naamgeving t.o.v. A/B/C-reeks

  Fix elke gevonden issue direct.

- [ ] **Stap 2: Scan en fix elearning-d2-claude-code.html**

  Bekende issues (was d1 in vorige audit):
  - `screen-module-5`: "Internettoegang (web search en web fetch)" als vaststaand feit → voeg noot toe: "Internettoegang via web search en web fetch is beschikbaar als Claude Code daarvoor toestemming heeft binnen de sessie — dit verschilt per configuratie"
  - `screen-module-2`: tip-box herhaalt "gewone taal" voor de derde keer → ofwel verrijken met een concreet voorbeeld van een gewone-taal-opdracht, ofwel samenvoegen met een ander scherm

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 3: Scan en fix elearning-d3-claude-md.html**

  Bekende issues (was d2):
  - `screen-module-3`: "Houd CLAUDE.md onder de 200 regels" zonder onderbouwing → voeg toe: "Claude Code herleest CLAUDE.md bij elk bericht. Een bestand van meer dan 200 regels kost tokens en kan Claude afleiden. Als je het niet in vijf minuten kunt lezen, is het waarschijnlijk te lang"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 4: Scan en fix elearning-d4-plan-mode.html**

  Nieuwe module (was d3) — scan volledig op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 5: Scan en fix elearning-d5-leeropdracht-d.html**

  Nieuwe module — nog niet geaudit. Scan volledig op alle vier criteria. Let extra op:
  - Consistentie met D-reeks terminologie (Claude Code, CLAUDE.md, Plan Mode)
  - Tijdsgebonden installatie-instructies

  Fix elke gevonden issue direct.

- [ ] **Stap 6: Documenteer in content-audit.md**

  Vervang de D-reeks entries in `content-audit.md` met actuele bevindingen.

- [ ] **Stap 7: Commit D-reeks**

  ```bash
  git add module-content/elearning-d1-wanneer-meer.html module-content/elearning-d2-claude-code.html module-content/elearning-d3-claude-md.html module-content/elearning-d4-plan-mode.html module-content/elearning-d5-leeropdracht-d.html content-audit.md
  git commit -m "content: schrijfkwaliteitsfix D-reeks — internettoegang voorbehoud, CLAUDE.md onderbouwing, platitudes"
  ```

---

## Taak 5: E-reeks

**Bestanden:**
- Modify: `module-content/elearning-e1-mcp.html`
- Modify: `module-content/elearning-e2-connectors.html`
- Modify: `module-content/elearning-e3-plugins.html`
- Modify: `module-content/elearning-e4-skills.html`
- Modify: `module-content/elearning-e5-eerste-skill.html`
- Modify: `module-content/elearning-e6-agentic-workflows.html`
- Modify: `module-content/elearning-e7-portfolio-website.html`
- Modify: `module-content/elearning-e8-leeropdracht-e.html`
- Modify: `content-audit.md`

- [ ] **Stap 1: Scan en fix elearning-e1-mcp.html**

  Bekende issues:
  - `screen-module-2-1` en `screen-module-2-3`: "meer dan 50 kant-en-klare MCP-connectoren" → "tientallen kant-en-klare MCP-connectoren voor de meest gebruikte tools"
  - `screen-module-4-2`: "hulp nodig van een implementatiepartner, zoals Umely" → "hulp nodig van een gespecialiseerde implementatiepartner" (zelfpromotie verwijderen)

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 2: Scan en fix elearning-e2-connectors.html**

  Bekende issues:
  - `screen-module-2`: "welke Connectors op dit moment beschikbaar zijn" → "Ga naar claude.ai > Settings > Connectors voor het actuele aanbod — beschikbaarheid verschilt per regio en abonnement"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 3: Scan en fix elearning-e3-plugins.html**

  Bekende issues:
  - tip-box bestandsgrootte: "momenteel ongeveer 30 MB per Project" → "Kennisbestanden hebben een maximale bestandsgrootte per Project. Zie de actuele limiet in de instellingen van je Project"
  - beperkingstabel: "Ongeveer 30 MB aan bestanden per Project" → zelfde fix

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 4: Scan en fix elearning-e4-skills.html**

  Bekende issues:
  - `screen-module-3`: "handmatig activeren" twee keer vermeld zonder uitleg → voeg toe: "Handmatig activeren doe je door de skill-naam expliciet te noemen in je opdracht aan Claude Code"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 5: Scan en fix elearning-e5-eerste-skill.html**

  Bekende issues:
  - `screen-module-1`: criterium "Taken waar je de aanpak nog niet kent" zonder toelichting → voeg toe als toelichting: "Als je de aanpak niet kent, kun je geen concrete stappen schrijven — en een skill zonder concrete stappen werkt niet"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 6: Scan en fix elearning-e6-agentic-workflows.html**

  Bekende issues:
  - `screen-module-2-2`: spelfout "financiele" → "financiële"

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 7: Scan en fix elearning-e7-portfolio-website.html**

  Geen bekende issues. Scan volledig op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 8: Scan en fix elearning-e8-leeropdracht-e.html**

  Nieuwe module — nog niet geaudit. Scan volledig op alle vier criteria. Let extra op:
  - Consistentie met E-reeks terminologie (MCP, Connectors, Skills, Plugins)
  - Tijdsgebonden verwijzingen naar externe MCP-servers

  Fix elke gevonden issue direct.

- [ ] **Stap 9: Documenteer in content-audit.md**

  Vervang de E-reeks entries in `content-audit.md` met actuele bevindingen.

- [ ] **Stap 10: Commit E-reeks**

  ```bash
  git add module-content/elearning-e1-mcp.html module-content/elearning-e2-connectors.html module-content/elearning-e3-plugins.html module-content/elearning-e4-skills.html module-content/elearning-e5-eerste-skill.html module-content/elearning-e6-agentic-workflows.html module-content/elearning-e7-portfolio-website.html module-content/elearning-e8-leeropdracht-e.html content-audit.md
  git commit -m "content: schrijfkwaliteitsfix E-reeks — tijdsgebonden limieten, zelfpromotie verwijderd, spelfout, platitudes"
  ```

---

## Taak 6: I-reeks

**Bestanden:**
- Modify: `module-content/elearning-i0-eindopdracht.html`
- Modify: `module-content/elearning-i1-praktijktoets.html`
- Modify: `module-content/elearning-i2-certificaat.html`
- Modify: `content-audit.md`

- [ ] **Stap 1: Scan en fix elearning-i0-eindopdracht.html**

  Nieuwe module — nog niet geaudit. Scan volledig op alle vier criteria. Let extra op:
  - Verwijzingen naar "alle voorgaande modules" die verouderen bij uitbreiding van de reeks
  - Belofte-achtige formuleringen zonder concreet mechanisme
  - Tijdsgebonden claims in de eindopdracht-instructies

  Fix elke gevonden issue direct.

- [ ] **Stap 2: Scan en fix elearning-i1-praktijktoets.html**

  Bekende issues:
  - Quiz-uitleg: "momenteel tijdrovend is" → "tijdrovend is" (verwijder "momenteel")

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 3: Scan en fix elearning-i2-certificaat.html**

  Bekende issues:
  - `screen-module-4`: "Claude en de tools eromheen ontwikkelen zich snel. Nieuwe functies, nieuwe Connectors, nieuwe mogelijkheden. Blijf experimenteren, blijf testen en blijf vragen stellen" → vervang door concreet: wat moet een gecertificeerde deelnemer doen om bij te blijven? Voorstel: "Volg de Anthropic changelog (anthropic.com/news) voor updates aan Claude en zijn functies. Als een functie die je hebt geleerd significant verandert, vermeldt Umely dit in het leerplatform"
  - `screen-module-4`: "Umely biedt voor gecertificeerde deelnemers updates aan als er significante veranderingen zijn" — ofwel concretiseren (hoe word je genotificeerd, wat telt als significant), ofwel de belofte verwijderen als het mechanisme niet bestaat

  Scan aanvullend op alle vier criteria. Fix elke gevonden issue direct.

- [ ] **Stap 4: Documenteer in content-audit.md**

  Vervang de I-reeks entries in `content-audit.md` met actuele bevindingen.

- [ ] **Stap 5: Commit I-reeks**

  ```bash
  git add module-content/elearning-i0-eindopdracht.html module-content/elearning-i1-praktijktoets.html module-content/elearning-i2-certificaat.html content-audit.md
  git commit -m "content: schrijfkwaliteitsfix I-reeks — AI-opvulling, vage belofte I2, tijdsgebonden taal"
  ```

---

## Taak 7: Cross-module consistentiecheck

**Doel:** Controleer of terminologie, toon en stijl consistent zijn over alle 32 modules heen.

**Bestanden:**
- Modify: Alle bestanden die inconsistenties bevatten
- Modify: `content-audit.md`

- [ ] **Stap 1: Controleer je/u-consistentie**

  Zoek naar "u " en "uw " in alle modules:
  ```bash
  grep -rn " u " module-content/elearning-*.html | grep -v "<!--" | grep -v "url" | grep -v "ður" | head -50
  grep -rn "\buw\b" module-content/elearning-*.html | grep -v "<!--" | head -50
  ```
  Fix alle gevonden instanties naar "je/jouw".

- [ ] **Stap 2: Controleer technische eigennamen**

  Zoek naar inconsistente schrijfwijze:
  ```bash
  # Claude Code (niet claude code, Claude code)
  grep -in "claude code" module-content/elearning-*.html | grep -v "Claude Code" | head -20
  # MCP (niet mcp, Mcp)
  grep -in "\bmcp\b" module-content/elearning-*.html | grep -v "\bMCP\b" | head -20
  # Connectors (niet connectors in lopende zin waar het als eigennaam fungeert)
  grep -n "connectors" module-content/elearning-*.html | grep -iv "Connectors" | head -20
  ```
  Fix gevonden inconsistenties.

- [ ] **Stap 3: Controleer naamgeving use cases en leeropdrachten**

  Zoek naar varianten van de use case-terminologie in leeropdracht-modules (A4, B4, C8, D5, E8, I0):
  ```bash
  grep -n "use.case\|jouw taak\|jouw opdracht\|praktijkgeval\|werkgeval" module-content/elearning-a4-leeropdracht-a.html module-content/elearning-b4-leeropdracht-b.html module-content/elearning-c8-leeropdracht-c.html module-content/elearning-d5-leeropdracht-d.html module-content/elearning-e8-leeropdracht-e.html module-content/elearning-i0-eindopdracht.html | head -40
  ```
  Kies de dominante term en pas de afwijkende instanties aan.

- [ ] **Stap 4: Controleer herhaling van de rode-draad-uitleg**

  De rode draad (use case door alle modules) wordt meerdere keren uitgelegd. Controleer of de uitleg bij A4, B4, C8, D5, E8 consistent dezelfde formulering gebruikt voor het concept:
  ```bash
  grep -n "rode draad\|use case.*bewaar\|dezelfde situatie\|eerder gekozen" module-content/elearning-a4-leeropdracht-a.html module-content/elearning-b4-leeropdracht-b.html module-content/elearning-c8-leeropdracht-c.html module-content/elearning-d5-leeropdracht-d.html module-content/elearning-e8-leeropdracht-e.html | head -30
  ```
  Pas afwijkende formuleringen aan zodat de uitleg van de rode draad in elke leeropdracht dezelfde structuur heeft.

- [ ] **Stap 5: Documenteer cross-module bevindingen in content-audit.md**

  Voeg een sectie toe aan `content-audit.md`:

  ```markdown
  ## Cross-module consistentiecheck — 2026-04-13

  [bevindingen per controletype, of: Geen inconsistenties gevonden]
  ```

- [ ] **Stap 6: Commit cross-module fixes**

  ```bash
  git add module-content/
  git add content-audit.md
  git commit -m "content: cross-module consistentiefix — je/u, eigennamen, rode-draad-terminologie"
  ```

---

## Definitieve audit-update

- [ ] **Stap 1: Update datum en samenvatting in content-audit.md**

  Voeg bovenaan `content-audit.md` toe:

  ```markdown
  # Content Audit - Umely E-learning Modules

  Datum laatste volledige audit: 2026-04-13
  Gecontroleerde modules: 32 (alle `elearning-*.html` in `module-content/`)
  Methode: volledig regel voor regel gelezen + cross-module consistentiecheck

  Controle op:
  1. AI-opvulling (platitudes, loze zinnen)
  2. Vage platitudes (uitspraken zonder concrete handeling of voorbeeld)
  3. Tijdsgebonden taal ("op dit moment", "binnenkort", concrete tarieven/limieten)
  4. Inconsistent taalgebruik (je/u, eigennamen, terminologie)
  ```

- [ ] **Stap 2: Final commit**

  ```bash
  git add content-audit.md
  git commit -m "content: content-audit.md bijgewerkt — volledige audit 32 modules 2026-04-13"
  ```
