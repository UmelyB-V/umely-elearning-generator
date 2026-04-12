# Umely — E-learning Generator

Gereedschapskist voor het bouwen en publiceren van interactieve e-learning modules voor het Umely platform.

## Projectstructuur

```
umely-elearning-generator/
├── CLAUDE.md                  ← Projectgeheugen & bouwregels
├── README.md                  ← Dit bestand
├── module-content/            ← 25 HTML content-bestanden + _shared-css/js
├── output/                    ← Lokaal gebouwde HTML (gitignored)
├── build-modules.js           ← Combineert shared CSS/JS + content → output/
├── upload-modules.js          ← Uploadt output/ naar Supabase
└── webapp/
    ├── server.js              ← Express backend
    └── public/
        ├── index.html
        ├── modules.html
        ├── account.html
        └── community.html
```

## Modules bouwen

Modules worden handmatig geschreven in `module-content/elearning-*.html`, volgens de structuurregels in `CLAUDE.md`.

### 1. Schrijf/bewerk een module

Bewerk `module-content/elearning-[slug].html` direct in Claude.

### 2. Bouw de output

```bash
node build-modules.js
```

Genereert `output/elearning-[slug]-[datum].html` met gedeelde CSS en JS.

### 3. Upload naar Supabase

```bash
node upload-modules.js
```

Upsert op slug — maakt nooit duplicaten.

### 4. Open en test

Open het gegenereerde HTML-bestand in je browser, of bekijk het via de webapp op `http://localhost:3000`.

## Webapp lokaal draaien

```bash
cd webapp && npm install && node server.js
# Open http://localhost:3000
```

## Huisstijl

- Primaire kleur: **#FF8514** (amber) / **#FF4D00** (flame)
- Fonts: **Arimo** (headings) + **Montserrat** (body)
- Achtergrond: **#FFF8F2** (warm wit)

## Contact

info@umely.ai | umely.ai
