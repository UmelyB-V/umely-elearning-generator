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
