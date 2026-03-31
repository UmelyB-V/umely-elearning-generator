# Content Review - 2026-03-31

## Samenvatting

23 modules gescand (A1 en A2 ontbreken in module-content/). 16 feitelijke issues, 3 te oppervlakkig, 1 overstatement. Geen m-dashes, geen marketingpraat.

## Meest kritieke issues

1. **E3 (Plugins)** - heel module beschrijft feature die niet bestaat als product
2. **D3 (Plan Mode)** - /plan en /memory commando's bestaan niet, hooks mechanisme fout
3. **"Geen internet" claims** - moet gecorrigeerd in B1, B2, C4, D1
4. **B3 hallucinatie** - te oppervlakkig, moet deep dive
5. **E7 onderschatting** - "kan geen login bouwen" is onjuist

---

## Module A3 - Hoe schrijf je goede prompts?
Geen issues.

## Module B1 - Veiligheid en privacy bij Claude
- [factual] ~47: Pro-abonnement training policy onjuist. Bij Pro is training standaard uit.
- [shallow] ~140: AVG sectie mist concreet voorbeeld verwerkersovereenkomst
- [factual] ~188: "belt niet naar buiten" mist nuance over web search en Connectors
- [factual] ~189: "geen autonome agent" is verouderd (Claude Code, agentic workflows)

## Module B2 - Claude voor niet-developers
- [overstatement] ~35: "80% van de gebruiksscenario's" is verzonnen getal
- [factual] ~114: "geen toegang tot inbox/cloud" mist Connectors nuance

## Module B3 - Fouten, troubleshooting en grenzen
- [shallow] ~33: Hallucinatie in 2 alinea's, mist: concrete voorbeelden, waarom het gebeurt, verificatiestrategieen
- [shallow] ~58: Onzekerheidscalibratie te kort, mist: wanneer Claude fout zit, wanneer betrouwbaar

## Module C1 - Claude.ai: de web-app
- [factual] ~82: Bestandstypen onvolledig (mist CSV, Excel)
- [factual] ~87: "bestand weg bij nieuw gesprek" mist Projects uitzondering

## Module C2 - Desktop-app
- [factual] ~67: Cowork beschrijving te beperkt (kan ook browsen, apps gebruiken)
- [factual] ~123: "kan geen programma's openen" is onjuist met computer use

## Module C3 - Claude in Chrome
- [factual] ~63: "Alleen Chrome" klopt niet, werkt ook in Edge/Brave (Chromium)

## Module C4 - Cowork: taken delegeren
- [factual] ~103: "Geen internettoegang" bij Cowork is fout
- [factual] ~117: Quiz feedback herhaalt foutieve claim

## Module C5 - Claude in Excel en PowerPoint
- [factual] Hele module: impliceert directe integratie die mogelijk niet bestaat als product

## Module C6 - Claude Settings
Geen issues.

## Module C7 - Claude als organisatie
- [factual] ~41: "Verwerkersovereenkomst beperkt" bij Teams is mogelijk onjuist

## Module D1 - Claude Code
- [factual] ~33: "versie van Claude" moet zijn "CLI tool"
- [factual] ~203: "Geen internet" in Kan-niet kolom, maar heeft web search/fetch tools

## Module D2 - CLAUDE.md
Geen issues.

## Module D3 - Plan Mode, commando's en hooks
- [factual] ~34: /plan commando bestaat niet (is Shift+Tab)
- [factual] ~77: /memory commando bestaat niet
- [factual] ~109: Hooks uitleg is fout (zijn shell commands in settings.json, niet in CLAUDE.md)

## Module E1 - MCP
Geen issues.

## Module E2 - Claude Connectors
- [factual] ~98: Microsoft 365 connectors lijst verifieer beschikbaarheid

## Module E3 - Claude Plugins
- [factual] HELE MODULE: "Plugins" en "Plugin Create" systeem bestaat niet als product feature

## Module E4 - Agent Skills
- [factual] ~32: Skills worden niet automatisch geladen op basis van taak

## Module E5 - Je eerste Skill bouwen
Geen extra issues (zie E4).

## Module E6 - Agentic workflows
Geen issues.

## Module E7 - Portfolio website bouwen
- [factual] ~164: "Kan geen inlogsysteem/database" is onjuist

## Module I1 - Praktijktoets
Geen issues.

## Module I2 - Umely Certificaat
Geen issues.

---

## Cross-module issues

1. **"Geen internet"** in B1, B2, C4, D1 - Claude KAN internet via web search, Connectors, MCP
2. **Cowork onderschat** in C2, C4 - kan meer dan alleen bestanden beheren
3. **E3 Plugins** - hoogste risico, gebruikers zoeken feature die niet bestaat
4. **D3 commando's** - gebruikers proberen /plan en /memory en falen direct
