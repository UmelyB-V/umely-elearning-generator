# Spec: E3 — Je eerste plugin bouwen

**Datum:** 2026-04-13
**Status:** Ter review

---

## Context

De E-reeks neemt studenten van MCP-begrip (E1) via kant-en-klare Connectors (E2) naar steeds meer eigen controle. E3 is de stap van "iemand anders zijn tool gebruiken" naar "je eigen tool bouwen". Daarna volgen Skills (E4/E5), Agentic Workflows (E6) en Portfolio (E7).

De originele E3-slot heette "Plugins" maar bevatte inhoud over een niet-bestaand Anthropic-feature. Die inhoud is vervangen door Projects/Custom Instructions (ook niet ideaal op deze plek — zie noot onderaan). Deze spec herstelt de originele bedoeling: studenten bouwen een eigen MCP-plugin.

---

## Leerdoelen

Na deze module kan de student:

1. Uitleggen wat het verschil is tussen een Connector (andermans systeem) en een plugin (eigen data/systeem)
2. Aan Claude Code beschrijven wat zijn plugin moet doen
3. De gegenereerde plugin starten via een startscript
4. De plugin koppelen aan Claude via het configuratiebestand
5. Verifiëren of Claude de plugin correct gebruikt

---

## Aanpak: lokale MCP-server via Claude Code

Claude Code genereert in één opdracht drie dingen:
- De servercode (Python of Node.js)
- Een startscript (dubbelklik → server draait)
- De exacte configuratieregel voor het Claude-configuratiebestand

De student hoeft de code niet te begrijpen. Hij beschrijft, Claude Code bouwt, student kopieert en start.

**Waarom lokaal (niet gehost):**
- Geen externe dienst of account nodig
- Sluit aan op wat studenten al kennen (Claude Code, D-reeks)
- Deployment hoort thuis in E8 of later
- Lager risico op mislukking door externe afhankelijkheden

---

## Schermstructuur

### `screen-welcome` (class="screen start")
**Badge:** E3 — Je eerste plugin bouwen
**Leerdoelen:** de vijf leerdoelen als `<ul>`
**Tijdsbadge:** ±20 minuten
**Intro:** "Connectors koppelen Claude aan systemen van anderen. Een plugin koppelt Claude aan wat jij hebt — je eigen klantenlijst, je eigen procedures, je eigen kennis. In deze module bouw je er één."

---

### `screen-module-1-1` — Connector vs. plugin: wat is het verschil?

Kernonderscheid:
- **Connector** = Anthropic heeft de koppeling gebouwd, jij schakelt hem in (Gmail, agenda, Notion)
- **Plugin** = jij bouwt de koppeling, Claude gebruikt jouw data

Wanneer kies je welk?
- Connector: als de tool al bestaat als Connector (Gmail, agenda)
- Plugin: als je eigen data wilt ontsluiten die nergens anders staat (klantenlijst, interne FAQ, bedrijfsprocedures)

SVG-illustratie: twee paden naar Claude — links Connector (van Anthropic naar Claude), rechts Plugin (van eigen data naar Claude).

---

### `screen-module-1-kc` — Kennischeck 1

Vraag over het verschil tussen Connector en plugin.

---

### `screen-module-2-1` — Wat gaat jouw plugin weten?

Student kiest zijn use case. Voorbeelden per sector:
- Makelaarskantoor: lijst van actieve woningen met vraagprijs en status
- Advocatenkantoor: overzicht van lopende zaken met partijen en deadlines
- Marketingbureau: tone-of-voice per klant + merkwaarden
- Accountant: vaste tarieven en servicepakketten

Instructie: beschrijf in gewone taal wat Claude moet kunnen opzoeken. Die beschrijving wordt de prompt voor Claude Code.

Tip-box: "Hoe specifieker je beschrijft welke informatie Claude moet kunnen raadplegen, hoe beter de plugin werkt."

---

### `screen-module-2-2` — Claude Code schrijft alles

De module geeft een exacte prompttemplate:

```
Maak een MCP-server in Python die Claude toegang geeft tot de volgende informatie:

[hier plakt de student zijn beschrijving uit het vorige scherm]

Genereer drie dingen:
1. De servercode als plugin.py
2. Een startscript start-plugin.bat voor Windows
3. De exacte regel die ik moet toevoegen aan mijn Claude-configuratiebestand, inclusief het volledige pad

Gebruik de officiële MCP Python SDK.
```

Student opent Claude Code, plakt de prompt, Claude genereert alles.

Tip-box (waarschuwing): "Sla de drie bestanden op in één map. Geef die map een duidelijke naam, zoals 'mijn-plugin'. Je hebt het pad naar die map nodig in de volgende stap."

---

### `screen-module-2-kc` — Kennischeck 2

Vraag over welke drie dingen Claude Code genereert en waarom elk onderdeel nodig is.

---

### `screen-module-3-1` — Koppelen: één regel in het configuratiebestand

Dit scherm heeft één doel: de student slaagt erin de plugin te koppelen zonder iets fout te doen.

**Stap 1: Configuratiebestand openen**
Exacte locatie op Windows:
```
C:\Users\[jouwgebruikersnaam]\AppData\Roaming\Claude\claude_desktop_config.json
```
Als het bestand niet bestaat: maak het aan als leeg JSON-bestand `{}`.

**Stap 2: Regel toevoegen**
Claude Code heeft de exacte regel al gegenereerd. Kopieer die en plak hem in het configuratiebestand.

Visueel blok: het bestand vóór en na de wijziging, zij aan zij. Vóór: `{}`. Na: de structuur met de plugin-entry.

**Stap 3: Opslaan en Claude herstarten**
Bestand opslaan → Claude desktop-app sluiten → Claude opnieuw openen.

Tip-box (waarschuwing): "JSON is gevoelig voor fouten. Als er een komma of haakje mist, start Claude niet goed op. Als dat gebeurt: kopieer de gegenereerde configuratieregel opnieuw van Claude Code en vervang de inhoud van het bestand."

---

### `screen-module-3-2` — Starten en verifiëren

**Stap 1: Plugin starten**
Dubbelklik `start-plugin.bat`. Een terminalvenster opent — dat venster moet open blijven. De plugin draait zolang dat venster open is.

**Stap 2: Testen**
Stel Claude precies deze vraag (aangepast aan de eigen use case):
> "Wat weet je over [onderwerp uit de plugin]?"

Als Claude antwoordt met informatie uit de plugin: gelukt.
Als Claude zegt dat hij het niet weet: zie de herstelstap hieronder.

**Herstelstap:**
1. Controleer of het terminalvenster van de plugin nog open is
2. Controleer of Claude na het starten van de plugin opnieuw is gestart
3. Open Claude Code en vraag: "Mijn plugin werkt niet. Dit is mijn configuratieregel: [plak de regel]. Wat klopt er niet?"

---

### `screen-module-3-kc` — Kennischeck 3

Scenario-vraag: plugin werkt niet, student kiest de juiste herstelstap.

---

### `screen-quiz` — Quiz (automatisch gegenereerd door build-modules.js)

5 vragen over:
1. Verschil Connector vs. plugin
2. Wat Claude Code genereert
3. Doel van het configuratiebestand
4. Wat het startscript doet
5. Hoe je verifieert of de plugin werkt

---

### `screen-result` — Resultaat (automatisch)

---

## Technische noot: Python SDK vereist

De MCP Python SDK moet geïnstalleerd zijn op de machine van de student. Claude Code kan hiervoor de installatie-instructie genereren (`pip install mcp`). Dit moet in scherm 2-2 worden vermeld als voorwaarde — voor de meeste studenten die Claude Code al gebruiken is Python beschikbaar.

Als alternatief: Claude Code kan ook een Node.js-variant genereren. De prompttemplate kan beide opties aanbieden zodat Claude Code kiest op basis van wat beschikbaar is.

---

## Noot: Projects/Custom Instructions (huidige E3-inhoud)

De huidige E3-transcriptie gaat over Projects en Custom Instructions — nuttige inhoud die nu een plekloze module bezet. Aanbeveling: verplaats die inhoud naar C7 (Claude als organisatie) of maak er een korte aanvulling op C6 (Settings) van. Dat is een aparte beslissing buiten de scope van deze spec.

---

## Risico's en mitigaties

| Risico | Mitigatie |
|---|---|
| JSON-syntaxfout in configuratiebestand | Vóór/na-voorbeeld + herstelstap via Claude Code |
| Plugin draait niet (Python niet geïnstalleerd) | Vermeld als voorwaarde, Claude Code genereert ook Node.js-variant |
| Terminalvenster per ongeluk gesloten | Expliciet vermeld dat venster open moet blijven |
| Student snapt gegenereerde code niet | Niet nodig — module benadrukt dat begrip geen vereiste is |

---

## Componenttypen in de module (minimaal 5 vereist)

1. `content-card` — uitleg
2. `tip-box` — info
3. `tip-box.waarschuwing` — technische risico's
4. `.vergelijk-tabel` of visueel vóór/na-blok — configuratiebestand
5. `scenario-blok` — herstelscenario in scherm 3-2
6. `kennischeck` — 3 stuks
7. SVG-illustratie — Connector vs. plugin diagram
