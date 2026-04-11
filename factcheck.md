# Factcheck — Umely E-learning modules
Datum: 2026-04-11

---

## Hoog risico

### elearning-c5-excel-powerpoint.html — screen-module-3
**Claim:** "Sinds begin 2026 is Claude beschikbaar als AI-subprocessor binnen Microsoft 365 Copilot (web, desktop en mobiel). Voor EU/VK-organisaties staat dit standaard uitgeschakeld — een M365-beheerder moet Claude eerst activeren via de Microsoft 365-beheerconsole."
**Type:** Integratiestatus (categorie 2)
**Reden:** Zeer specifiek en datumgebonden. Rollout-moment, EU/VK-standaardinstellingen en M365-console-structuur kunnen al veranderd zijn. Verifieer via actuele Microsoft- en Anthropic-documentatie.

### elearning-d1-claude-code.html — screen-module-3 (installatie)
**Claim:** `npm install -g @anthropic-ai/claude-code` (installatiestap)
**Type:** Technisch installatiecommando (categorie 2)
**Reden:** Pakketnaam, installatiemethode en Node.js-vereisten kunnen veranderen. Hardcoded commando's verouderen snel. Beter: verwijs naar `docs.anthropic.com` voor actuele installatiestappen.

---

## Middel risico

### elearning-a1-wat-is-claude.html — screen-module-1-1
**Claim:** "Anthropic werd opgericht in 2021 door Dario Amodei, Daniela Amodei en een groep voormalige OpenAI-medewerkers."
**Type:** Bedrijfsfeit (categorie 1)
**Reden:** Oprichtingsjaar en namen zijn correct en stabiel. Nu correct — geen actie nodig maar goed op radar houden voor quiz-antwoorden.

### elearning-c3-chrome.html — screen-module-1 + quiz
**Claim:** "De extensie werkt in Chrome en Chromium-browsers zoals Edge en Brave. Firefox en Safari worden niet ondersteund."
**Type:** Browser support (categorie 4)
**Reden:** Browser support is volatiel. Correct per april 2026, maar kan snel veranderen. Overweeg verwijzing naar actuele support-pagina.

### elearning-e2-connectors.html — screen-module-3 + kennischeck
**Claim:** "Connectors zijn beschikbaar bij Pro en Teams abonnementen, niet bij de gratis versie."
**Type:** Feature per abonnementstier (categorie 5)
**Reden:** Abonnementstructuren veranderen regelmatig. Correct per april 2026. Overweeg "controleer actuele beschikbaarheid op claude.ai/pricing."

### elearning-e1-mcp.html — screen-module-2 (algemeen)
**Claim:** Diverse claims over welke MCP-servers beschikbaar zijn en hoe MCP werkt.
**Type:** Productstatus Claude-feature (categorie 2)
**Reden:** MCP evolueert snel. Claims over specifieke servers en configuratiestappen kunnen verouderen. Periodieke controle vereist.

### elearning-b2-projecten.html — screen-module-1 (Projects)
**Claim:** Claims over hoe Projects werken, wat er opgeslagen wordt en wat de limieten zijn.
**Type:** UI en feature-werking (categorie 4)
**Reden:** Projects-functionaliteit wordt actief uitgebreid door Anthropic. Limieten en UI-labels kunnen veranderen.

---

## Laag risico

### elearning-a1-wat-is-claude.html — screen-module-4-1
**Claim:** "Claude ondersteunt grote context windows — controleer de actuele specs op docs.anthropic.com/models."
**Type:** Contextvenster (categorie 1)
**Reden:** Verwijst terecht naar de docs in plaats van een hardcoded getal. Goede aanpak, geen actie nodig.

### elearning-a1-wat-is-claude.html — meerdere schermen
**Claim:** "Elk gesprek begint blanco. Met Projects of via de API kun je wel geheugen toevoegen."
**Type:** Geheugen/architectuur (categorie 2)
**Reden:** Architecturaal stabiel en correct. Zal waarschijnlijk niet snel veranderen.

### elearning-d1-claude-code.html — screen-module-1
**Claim:** "Claude Code is een command-line tool waarmee je Claude via de terminal gebruikt."
**Type:** Productbeschrijving (categorie 2)
**Reden:** Globale beschrijving, niet afhankelijk van implementatiedetails. Stabiel.

---

## Reeds gecorrigeerd

### elearning-c3-chrome.html — screen-module-3 (gecorrigeerd 2026-04-11)
**Was:** "De extensie leest mee maar handelt niet. Hij kan geen formulieren invullen, niet op knoppen klikken."
**Nu:** "In agentic modus kan Claude acties uitvoeren, maar alleen na een expliciete opdracht van de gebruiker."
**Reden:** Feitelijk onjuist — extensie KAN wel acties uitvoeren in agentic modus.

---

## Aanbevelingen

1. **C5 (Excel/PowerPoint)** — verifieer MS 365 Copilot integratie via docs.microsoft.com + anthropic.com vóór volgende gebruikersstart
2. **D1 (Claude Code)** — vervang hardcoded installatiestap door verwijzing naar actuele docs
3. **E1 (MCP) en E2 (Connectors)** — review elk kwartaal; deze features veranderen het snelst
4. **Algemeen** — voeg bij tijdsgebonden claims "(controleer actuele status op claude.ai)" toe

## Volgende factcheck
Aanbevolen: juli 2026 (of direct na een grote Claude-release van Anthropic)
