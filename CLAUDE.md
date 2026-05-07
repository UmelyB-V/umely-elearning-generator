# CLAUDE.md

## Werkmap

```bash
cd "C:\Users\davem\OneDrive\AI Space\Umely\umely-elearning-generator\umely-elearning-generator"
```

## Wat doet deze app?

Betalende gebruikers (95 euro/maand) krijgen toegang tot curated e-learning modules over Claude AI. Dave en Sonny maken de modules, gebruikers consumeren ze. Modules staan in Supabase en worden geserveerd als standalone HTML.

## Lokaal draaien

```bash
cd webapp && npm install && node server.js
# Open http://localhost:3000
```

**Omgevingsvariabelen (webapp/.env):**
```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=eyJ...        # service role key
SUPABASE_ANON_KEY=eyJ...   # anon key (frontend)
PORT=3000
```

## Projectstructuur

```
umely-elearning-generator/
├── CLAUDE.md
├── transcriptie-*.md          <- 25 transcripties als bronmateriaal
├── module-content/            <- 25 HTML content-bestanden + _shared-css/js
├── output/                    <- lokaal gebouwde HTML (gitignored)
├── build-modules.js           <- combineert shared CSS/JS + content -> output/
├── upload-modules.js          <- uploadt output/ naar Supabase
└── webapp/
    ├── server.js              <- Express backend
    ├── prompt.md              <- instructies + structuurregels
    ├── boilerplate.html       <- alle CSS, JS en vaste HTML-blokken
    └── public/
        ├── index.html         <- login UI
        ├── modules.html       <- modulebibliotheek
        └── account.html       <- gebruikersbeheer
```

## Modulebouwpipeline

1. Schrijf/bewerk content in `module-content/elearning-*.html`
2. Run `node build-modules.js` → genereert `output/elearning-*-YYYYMMDD.html`
3. Run `node upload-modules.js` → upsert op slug naar `elearning.modules`

Modules worden opgeslagen met een schone slug zonder datum, bv. `elearning-a1-wat-is-claude`. Bij upload altijd upsert op slug — nooit duplicaten aanmaken.

Opruimen van gedateerde dubbelen:
```sql
DELETE FROM elearning.modules WHERE slug ~ '-2026[0-9]{4}$';
```

## Database (Supabase)

**Project ID:** `dsxyygvvtwnsoiubrwxc` | **Regio:** eu-west-1

Gebruik altijd schema `elearning`, nooit `public`. Dit Supabase-project wordt gedeeld met andere projecten van Dave — `public` bevat tabellen van Notulizer, Paphos en andere apps.

### Tabellen `elearning`

| Tabel | Doel |
|---|---|
| `modules` | id, filename, title, slug (unique), html, created_at, created_date |
| `profiles` | id, email, role (user/admin), stripe_customer_id, subscription_status (active/inactive), subscription_start, subscription_end, newsletter_subscribed |
| `user_progress` | user_id, module_slug, score_pct, completed, completed_at, updated_at |
| `community_messages` | room_level (1-4), user_id, user_name, is_admin, content |
| `community_profiles` | bio, specializations, company, socials, avatar_url, is_public, community_access, stripe velden |
| `community_follows` | requester_id, target_id, status (pending/accepted/declined) |
| `community_dm_rooms` | user1_id, user2_id |
| `community_dm_messages` | room_id, sender_id, sender_name, content |
| `app_settings` | key, value, updated_at |
| `news_items` | title, summary, relevance, url, categorie, datum, used |

### Supabase MCP gebruiken

```
project_id: dsxyygvvtwnsoiubrwxc
query:       SELECT ... FROM elearning.modules ...
```

**Valkuilen:**
- Project ID in `.env` (`ummcgaazziivvxgfwsio`) is NIET het MCP project ID
- `FROM modules` zonder schema geeft lege resultaten
- REST API gebruikt standaard `public` — stuur altijd header `Content-Profile: elearning`
- Verifieer na upload: `html LIKE '%zoekterm%'`

## Contentbestand-structuur

Elk `module-content/elearning-*.html` begint met:

```html
<!-- TITLE: A1 - Wat is Claude? -->
<!-- SCHERMEN: 'screen-welcome','screen-module-1-1',...,'screen-quiz','screen-result' -->
<!-- MODULE_TITELS: 'screen-module-1-1':'Wat is een prompt?',... -->
<!-- QUIZ_START -->
[ { "vraag": "...", "opties": ["..."], "correct": 0, "uitleg": "..." } ]
<!-- QUIZ_END -->
```

Daarna de schermen als `<div id="screen-*" class="screen">` blokken.

### Schermstructuur per onderdeel

- `screen-module-X-1` — Uitleg
- `screen-module-X-2` — Verdieping (tabel, flashcards, scenario)
- `screen-module-X-3` — Praktijk (concrete toepassing)
- `screen-module-X-kc` — Kennischeck (altijd op eigen scherm)

`screen-quiz` en `screen-result` worden automatisch toegevoegd door `build-modules.js`.

### CSS-componenten (`_shared-css.html`)

| Class | Gebruik |
|---|---|
| `.content-card` | standaard tekstblok |
| `.module-header` | donkergrijze sectionheader |
| `.kennischeck` | multiple choice blok |
| `.tip-box` / `.tip-box.waarschuwing` | info / waarschuwing |
| `.flashcard-set` / `.flashcard` | klikbare kaartjes |
| `.stappen-lijst` / `.stap-item` | genummerde stappen |
| `.vergelijk-tabel` | vergelijkingstabel |
| `.scenario-blok` / `.scenario-keuze` | klikbaar scenario |
| `.processtroom` / `.proces-blok` | visuele processtroom |
| `.tijdlijn` / `.tijdlijn-punt` | tijdlijn |
| `.sorteer-lijst` / `.sorteer-item` | drag-to-sort |
| `.drag-items` / `.drop-zone` | drag-and-drop |
| `.invul-wrap` / `.invul-input` | invulvak in zin |
| `.visual-block` | wrapper voor inline SVG |

### JS-functies (`_shared-js.html`)

- `goTo(screenId)` — navigeer naar scherm
- `checkKC(nr, el, isCorrect, volgendeScherm, uitleg)` — kennischeck verwerken
- `resetKC(nr)` — reset kennischeck
- `toggleFlashcard(el)` — open/sluit flashcard
- `checkScenario(nr, el, isCorrect, uitleg)` — scenario antwoord
- `checkInvul(inputId, correctAntwoord, feedbackId)` — invulvak check
- `checkSorteer(lijstId, correcteVolgorde, feedbackId)` — sorteeroefening
- `toggleLeesMeer(btn, contentId)` — lees-meer knop
- `togglePopup(popupId)` — diagram popup

### SVG-illustraties

Gebruik altijd **inline SVG** in een `.visual-block` — geen externe afbeeldingen.

```html
<div class="visual-block">
  <svg viewBox="0 0 580 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:10px;box-shadow:0 2px 16px rgba(0,0,0,0.09);">
    <!-- inhoud -->
  </svg>
</div>
```

Regels: `viewBox="0 0 580 [hoogte]"`, alleen Umely-kleuren (`#27292D`, `#FF8514`, `#FFF8F2`, `#EAE6E0`), `font-family="Arial, sans-serif"`, positie direct na uitlegparagraaf.

## Modules (25 stuks)

| Slug | Titel |
|---|---|
| elearning-a1-wat-is-claude | A1 - Wat is Claude en Anthropic? |
| elearning-a2-ecosysteem | A2 - Het Claude-ecosysteem |
| elearning-a3-prompts | A3 - Hoe schrijf je goede prompts? |
| elearning-b1-veiligheid | B1 - Veiligheid & Privacy bij Claude |
| elearning-b2-niet-developers | B2 - Claude voor niet-developers |
| elearning-b3-fouten | B3 - Fouten, troubleshooting en grenzen van Claude |
| elearning-c1-webapp | C1 - Claude.ai: de web-app |
| elearning-c2-desktop | C2 - Desktop-app: Chat, Cowork en Code |
| elearning-c3-chrome | C3 - Claude in Chrome |
| elearning-c4-cowork | C4 - Cowork: taken delegeren aan Claude |
| elearning-c5-excel-powerpoint | C5 - Claude in Excel en PowerPoint |
| elearning-c6-settings | C6 - Claude Settings instellen |
| elearning-c7-organisatie | C7 - Claude als organisatie |
| elearning-d1-claude-code | D1 - Claude Code: wat is het en hoe start je? |
| elearning-d2-claude-md | D2 - CLAUDE.md: projectgeheugen voor Claude Code |
| elearning-d3-plan-mode | D3 - Plan Mode, commando's en hooks |
| elearning-e1-mcp | E1 - MCP: Claude verbinden met externe tools |
| elearning-e2-connectors | E2 - Claude Connectors |
| elearning-e3-plugins | E3 - Projects en Custom Instructions |
| elearning-e4-skills | E4 - Agent Skills en SKILL.md begrijpen |
| elearning-e5-eerste-skill | E5 - Je eerste Skill bouwen |
| elearning-e6-agentic-workflows | E6 - Agentic Workflows Ontwerpen |
| elearning-e7-portfolio-website | E7 - Portfolio website bouwen met Claude |
| elearning-i1-praktijktoets | I1 - Praktijktoets: bouw een volledig project |
| elearning-i2-certificaat | I2 - Het Umely Certificaat |

Slugnaam = bestandsnaam zonder `.html`. Bij nieuwe module: kies een slug die past in de reeks (a/b/c/d/e/i), upsert op slug bij upload.

## Webapp-architectuur

- Auth via Supabase JWT (`requireAuth` middleware op alle beveiligde endpoints)
- Abonnementscheck via `requireSubscription` — geeft 402 als `subscription_status` niet `active` is
- Admincheck via `requireAdmin` — geeft 403 als `role` niet `admin` is

**Endpoints:**
- `GET /api/config` — Supabase URL + anon key naar frontend
- `GET /api/modules` — lijst alle modules + user role
- `GET /api/module-html/:slug` — serveert module HTML (vereist Bearer token)
- `GET /modules/:slug` — publieke loader die auth token + protection script injecteert
- `POST /api/user/progress` — voortgang opslaan (score_pct, completed)
- `PATCH /api/modules/:slug` — module hernoemen (admin)
- `DELETE /api/modules/:slug` — module verwijderen (admin)
- `GET /api/users` — alle gebruikers + voortgang (admin)
- `PATCH /api/users/:userId/role` — rol wijzigen (admin)
- `POST /api/newsletter/subscribe` — nieuwsbrief aanmelding (Supabase + MailerLite)
- `POST /api/stripe/webhook` — Stripe webhook voor abonnementsbeheer

**Stripe webhook events:**
- `customer.subscription.created` → `subscription_status: active`, slaat `subscription_start` op
- `customer.subscription.updated` → update status + `subscription_end` datum
- `customer.subscription.deleted` → `subscription_status: inactive`

**Module HTML-injectie:** bij `/modules/:slug` injecteert de server vóór `</head>`:
```html
<script>
  window.__AUTH_TOKEN__  = "...";   // JWT token voor API-calls vanuit de module
  window.__USER_EMAIL__  = "...";   // e-mailadres van de ingelogde gebruiker
  window.__USER_NAME__   = "...";   // naam (of email als fallback)
</script>
<script src="/protection.js"></script>  <!-- niet voor admins -->
```
Admins krijgen geen `protection.js` — zij kunnen de module normaal bekijken voor review.

**Admin-rechten:** admins omzeilen ook `requireSubscription` (geen betaald abonnement vereist). Exclusieve admin-endpoints:
- `GET /api/users` — alle gebruikers + voortgang
- `PATCH /api/users/:userId/role` — rol wijzigen (admin/user)
- `PATCH /api/modules/:slug` — module hernoemen
- `DELETE /api/modules/:slug` — module verwijderen
- `GET /admin/review-data` — alle modules als één HTML-pagina voor review
- `GET /api/admin/activity` — activiteitenlog

**protection.js** doet 4 dingen voor niet-admin gebruikers:
1. **Watermark** — naam + e-mail als herhalend canvas-patroon over de volledige pagina
2. **Print block** — CSS `@media print` verbergt alle content, toont alleen een melding
3. **Rechtermuisknop / selecteren / kopiëren** — geblokkeerd binnen `.screen`, `#app`, `.module-wrapper`
4. **Devtools detectie** — bij >200px verschil tussen outer/innerWidth of Height: content wordt geblurred

**Legacy generator-bestanden:** `webapp/prompt.md` en `webapp/boilerplate.html` zijn overblijfsels van de oude generator waarbij Claude direct HTML genereerde via de webapp. Die workflow wordt niet meer gebruikt. Modules worden nu handmatig gebouwd in `module-content/` via deze CLAUDE.md als leidraad.

## Huisstijl modules

- Fonts: **Arimo** (headings) + **Montserrat** (body). Nooit Inter/Roboto/Poppins.
- Kleuren: `--amber: #FF8514`, `--flame: #FF4D00`, `--gold: #FFD964`, `--fg: #27292D`
- Module-header: donkergrijs (`#27292D`), geen oranje gradient

## Kwaliteitsregels (VERPLICHT)

**Werkwijze:** schrijf eerst, controleer daarna. Vóór je een module als klaar beschouwt, loop je de zelfscheck hieronder af. Elke fout fix je direct — geen uitzonderingen.

### Regels

**Welkomscherm:** `class="screen start"` (niet `class="screen"`), `welcome-badge`, leerdoelen als `<ul>` VOOR `tijdsbadge`. Leerdoelen zijn meetbaar: "je beschrijft / past toe / kiest" — nooit "je begrijpt".

**MODULE_TITELS:** altijd beschrijvend. Nooit "Module 1", "Onderdeel 1", "Kennischeck" alleen. KC-schermen: "Kennischeck: wat de vraag test".

**Navigatie:** build-modules.js maakt nav-divs automatisch. Geen inline navigatieknoppen in contentschermen. Uitzondering: "Naar de afsluitquiz" op het laatste contentscherm.

**Kennischecks:** ALTIJD op eigen `-kc` scherm. Nooit embedded in een contentscherm.

**Quiz:** 5-7 vragen, elk met inhoudelijk `uitleg`-veld. JSON tussen `<!-- QUIZ_START -->` en `<!-- QUIZ_END -->`. `correct`-index valt binnen 0..opties.length-1.

**SVG:** `viewBox="0 0 580 [hoogte]"` altijd. `font-family="Arial, sans-serif"` op alle tekst. Inline in `<div class="visual-block">`.

**Verboden SVG-kleuren:** `#F7F4F0` → `#FFF8F2` | `#4CAF50` / `#28c840` → `#22c55e` | `#3B82F6` / `#6366F1` → `#FF8514` | macOS-kleuren (`#ff5f57`, `#febc2e`, `#28c840`) → Umely-palet of transparant

**Schrijven — verboden:**
- M-dashes (`—`) in HTML-tekst → gebruik `:` `.` `,` of `(` ... `)`
- Tijdsgebonden: "op dit moment", "momenteel", "in 2024/2025/2026", "nieuwste versie"
- Prijsbedragen: `€XX` / `$XX` → "zie claude.ai/pricing"
- AI-opvulling: "gebruik Claude verstandig", "mogelijkheden zijn eindeloos"
- Waarschuwing zonder concrete vervolgstap
- Lege `<div class="btn-wrap">`

**`ANTHROPIC_API_KEY`** is alleen voor `server.js` — nooit in scripts of build-bestanden.

### Zelfscheck — loop dit af voor je klaar bent

**Technisch**
- [ ] Elk `goTo('X')` → `<div id="X">` bestaat (of wordt door build toegevoegd)
- [ ] `checkKC(N,...)` → `id="kc-N"` en `id="kc-feedback-N"` aanwezig
- [ ] `checkScenario(N,...)` → `id="scenario-N"` en `id="scenario-feedback-N"` aanwezig
- [ ] SCHERMEN-array compleet inclusief screen-quiz en screen-result
- [ ] Quiz JSON geldig, 5-7 vragen, elk `uitleg`-veld gevuld, correct-index klopt
- [ ] Geen externe CDN-URLs

**Structuur & design**
- [ ] `class="screen start"` op welkomscherm, welcome-badge, leerdoelen voor tijdsbadge
- [ ] Kennischecks op eigen `-kc` schermen
- [ ] Laatste contentscherm heeft quiz-knop
- [ ] Alle MODULE_TITELS beschrijvend (inclusief KC-schermen)
- [ ] Min. 5 componenttypen (3 voor leeropdracht/certificaat-modules)
- [ ] Alle SVG viewBox breedtes zijn 580
- [ ] Geen verboden kleuren, alle flashcards hebben `onclick="toggleFlashcard(this)"`

**Schrijfkwaliteit**
- [ ] Grep je eigen output op `—` — zo ja: fix eerst
- [ ] Geen tijdsgebonden taal, geen prijsbedragen, geen lege btn-wraps

**Daarna:**
```bash
node build-modules.js && node validate-modules.js
```
Exit code 0 vereist. Zo niet: fix en herhaal.

## Referentiebronnen

| Onderwerp | Bron |
|---|---|
| Claude-modellen, API, functies, limieten | docs.anthropic.com |
| Abonnementen, prijzen | claude.ai/pricing |
| Anthropic bedrijfsinformatie | anthropic.com |
| Claude in Microsoft 365 / Azure AI | learn.microsoft.com + azure.microsoft.com |
| Claude Chrome-extensie | chromewebstore.google.com |
| MCP-servers | docs.anthropic.com/mcp |
| Claude Code (CLI) | docs.anthropic.com/claude-code |

## Kwaliteitsproces

**Content audit** — scan alle modules op: AI-opvulling, oppervlakkige schermen, tijdsgebonden taal, vage instructies zonder concrete actie. Sla op in `content-audit.md`.

**Factcheck** — scan op verifieerbare claims. Per claim: exacte zin, module, scherm-ID, risico (Hoog/Middel/Laag). Sla op in `factcheck.md`. Hoog-risico claims handmatig verifiëren via Anthropic docs, daarna fixen en opnieuw uploaden.

Categorieën om te markeren:
1. Feiten over Claude/Anthropic (oprichtingsjaar, versienamen, contextvenster-groottes)
2. Claims over hoe Claude werkt (functies, geheugen, Projects, Connectors, MCP)
3. Claims over andere tools (OpenAI, ChatGPT, Gemini, Copilot)
4. UI-paden en menu-namen in claude.ai (verouderen bij interface-updates)
5. Getallen en limieten (bestandsgroottes, token-limieten, prijzen)

**Wanneer:** na schrijven/herschrijven van modules, minimaal eens per kwartaal.
