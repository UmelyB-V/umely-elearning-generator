# Review prompt — Lezing Handout

Plak dit in claude.ai (computer use) of een Claude-sessie met browsertoegang.

---

## PROMPT

Je gaat de Umely lezing handout volledig reviewen en fact-checken. De module draait lokaal op http://localhost:3000/handout

**Stap 1 — Inloggen**
Ga naar http://localhost:3000 en log in met een testaccount (of vraag de gebruiker om in te loggen). Ga daarna naar http://localhost:3000/handout

**Stap 2 — Doorloop alle 14 schermen**

Loop elk scherm volledig door in deze volgorde:
1. screen-welcome
2. screen-module-1-1 (Het prompt-model: 6 onderdelen)
3. screen-module-1-2 (Typen of inspreken)
4. screen-module-1-kc (Kennischeck prompt-model)
5. screen-module-2-1 (Claude: AI-assistent voor kantoorwerk)
6. screen-module-2-2 (Claude in actie)
7. screen-module-2-kc (Kennischeck Claude)
8. screen-module-3-1 (Typeless: dicteren als superkracht)
9. screen-module-4-1 (Vier extra tools: overzicht)
10. screen-module-4-2 (Wanneer gebruik je welke tool?)
11. screen-module-5-1 (Maatwerk AI: n8n en Claude Code)
12. screen-module-5-2 (Jouw volgende stap / upsell)
13. screen-quiz (Afsluitquiz — alle 5 vragen)
14. screen-result

Maak bij elk scherm een screenshot.

---

**Stap 3 — Beoordeel op deze punten**

Voor elk scherm, noteer:
- Ziet het er visueel correct uit? (Umely amber #FF8514, Arimo headings, warm white achtergrond)
- Zijn alle interactieve elementen werkbaar? (flashcards, knoppen, antwoordopties, voortgangsbalk)
- Is de tekst leesbaar en goed opgemaakt?
- Eventuele layout-problemen, tekst die overloopt, of elementen die ontbreken?

---

**Stap 4 — Fact-check per tool**

Controleer de volgende beweringen in de module op feitelijke juistheid:

**Claude (Anthropic)**
- Kan Claude documenten analyseren en samenvatten? ✓/✗
- Kan Claude schrijven, herschrijven en vertalen? ✓/✗
- Heeft Claude geen toegang tot actueel internet? (relevant voor quiz vraag 3 en 4) ✓/✗
- Is het juist dat Claude plausibel klinkende informatie kan "verzinnen" (hallucinations)? ✓/✗
- Is de bewering correct dat je bij juridische output (Hoge Raad) altijd bronnen moet verifiëren? ✓/✗

**Typeless**
- Is Typeless een dicteertool die werkt in elke app via een overlay? ✓/✗
- Klopt het dat Typeless spraak-naar-tekst omzet zodat je kunt inspreken in Claude? ✓/✗
- Is de bewering juist dat inspreken sneller is dan typen voor langere, contextrijke input? ✓/✗
- Werkt Typeless in een open kantooromgeving zonder problemen? (module zegt: "not ideal") ✓/✗

**Perplexity**
- Is Perplexity een AI-zoekmachine die live het internet doorzoekt? ✓/✗
- Geeft Perplexity bronvermelding bij antwoorden? ✓/✗
- Is Perplexity geschikt voor actuele marktdata en nieuwsfeiten? ✓/✗
- Heeft Perplexity een "Deep Research" functie? ✓/✗

**NotebookLM (Google)**
- Werkt NotebookLM primair met documenten die je zelf uploadt? ✓/✗
- Kan NotebookLM een AI-podcastsamenvatting genereren van je bronnen? ✓/✗
- Is het juist dat NotebookLM NIET geschikt is voor live internet-research? ✓/✗

**Gamma.app**
- Is Gamma een AI-tool voor het genereren van presentaties? ✓/✗
- Is de positionering correct: Gamma voor visuele output, niet voor research/schrijven? ✓/✗

**n8n**
- Is n8n een open-source workflow automation tool? ✓/✗
- Klopt het dat n8n met Claude kan koppelen via een API? ✓/✗
- Is het correct dat n8n processen automatiseert zonder handmatig ingrijpen? ✓/✗

**Claude Code (Anthropic)**
- Is Claude Code een CLI-tool voor developers? ✓/✗
- Klopt de bewering dat Claude Code in de terminal werkt en codeerbases kan begrijpen? ✓/✗

---

**Stap 5 — Quiz beoordeling**

Loop alle 5 quizvragen door en beoordeel:
- Is het goede antwoord daadwerkelijk het beste antwoord? Zijn er andere opties die ook verdedigbaar zijn?
- Zijn de afleiders (verkeerde opties) realistisch maar duidelijk fout?
- Is de uitleg correct en volledig?
- Is de moeilijkheidsgraad "toegepast" (niet puur definitie/weetje)?

Vragen om te beoordelen:
1. Samenvatting 900 woorden te technisch → ontbrekende prompt-elementen (antwoord: Vorm + Doelgroep)
2. Boze klant, empathische reactie → beste aanpak (antwoord: Typeless + prompt-model)
3. Marktanalyse AI in logistiek → werkvolgorde (antwoord: Perplexity Deep Research → Claude schrijft)
4. Drie meest gefinancierde AI-startups Nederland → tool-keuze (antwoord: Perplexity)
5. Makelaarskantoor koopaanvragen → automatisering (antwoord: n8n + Claude API)

---

**Stap 6 — Kennischecksvragen beoordelen**

KC-1 (scherm-module-1-kc):
Salesmanager geeft prompt "schrijf een overtuigende tekst over ons nieuwe product", krijgt generieke 400-woorden formele tekst. Welke twee elementen zorgden hiervoor?
- Controleer of het goede antwoord (Doelgroep + Vorm) logisch is gegeven de symptomen (generiek + verkeerde lengte/toon)

KC-2 (screen-module-2-kc):
Claude geeft gedetailleerd antwoord over Hoge Raad uitspraken. Wat doe je?
- Controleer of het goede antwoord (structuur gebruiken maar feiten verifiëren via officiële bronnen) het juiste evenwicht heeft

---

**Stap 7 — Eindrapport**

Geef een overzichtelijk rapport met:

### Visueel / UX
- Schermen die er goed uitzien
- Problemen gevonden

### Fact-check resultaten
- Per tool: ✓ correct / ✗ onjuist / ⚠ nuance nodig
- Exacte zin in de module + correctie als iets klopt

### Quiz & KC kwaliteit
- Per vraag: oordeel over correctheid antwoord + kwaliteit afleiders
- Verbeterpunten als die er zijn

### Prioriteitenlijst
Geef max. 5 concrete aanpassingen die het grootste verschil maken, op volgorde van prioriteit.
