# Handout E-learning — Klad

## Wat dit is

De bestaande Umely PDF-handout ("Quickstart guide AI-tools", gemaakt door Sonny) wordt omgebouwd tot een gratis interactieve e-learning module. Mensen die een lezing bijwonen scannen voortaan een QR-code en landen in deze module in plaats van een PDF te ontvangen.

Doel: lezingbezoekers terugbrengen naar het Umely-platform en enthousiasmeren voor de volledige betaalde e-learning.

---

## De gebruikersflow

```
Lezing bijwonen
  → QR-code scannen (op slide of flyer)
  → Landingspagina: e-mailadres invullen
  → Module opent direct in de browser
  → 20-25 minuten interactief leermateriaal
  → Laatste scherm: CTA naar de volledige e-learning
```

Geen app, geen account, geen wachtwoord. Werkt op telefoon en laptop.

---

## Modulestructuur (5 onderwerpen)

| Onderdeel | Inhoud |
|---|---|
| 1 | Claude: wat het is, het promptmodel (6 onderdelen), prompt-modi |
| 2 | Typeless: spraak-naar-tekst, installatie en gebruik |
| 3 | Gemini: chatassistent, NanoBanana (beeld), Veo (video) |
| 4 | Perplexity/Comet + Gamma.app + NotebookLM |
| 5 | n8n + Cursor (maatwerk-AI) + CTA naar volledige e-learning |

Sleutel in de e-learning reeks: nog te bepalen (bijv. F0 of Z0 als gratis instapmodule).

---

## Twee openstaande vragen (beantwoorden bij herstart)

1. **Modulesleutel:** Waar valt deze module in de bestaande reeks? Eigen letter/nummer buiten A-E-I, of aparte map?
2. **Typeless-inhoud:** Alleen op basis van brein/volledig.md, of heeft Sonny meer materiaal?

---

## Technische opzet (nog te bouwen)

| Onderdeel | Status |
|---|---|
| Demo-preview (landingspagina + 2 onderdelen) | Klaar — demo-preview.html |
| Volledige module (module-content/) | Nog te bouwen |
| Landingspagina (apart HTML-bestand) | Nog te bouwen |
| E-mailopslag (Supabase of extern) | Nog te bepalen |
| Publieke URL / hosting | Nog te bepalen |
| QR-code genereren | Laatste stap |

---

## Bouwlocatie

Module wordt gebouwd in:
`umely-elearning-generator/module-content/`

Bestandsnaam (voorstel): `elearning-f0-quickstart-ai-tools.html`

Volgt dezelfde pipeline als alle andere modules:
`module-content/*.html` → `build-modules.js` → `output/*.html` → Supabase

---

## Huisstijlregels (ter herinnering)

- Kleuren: `#FF8514` (amber), `#FF4D00` (flame), `#27292D` (charcoal), `#FFF8F2` (warm wit)
- Fonts: Arimo (headings), Montserrat (body)
- Geen blauw, geen groen, geen ChatGPT-referenties
- Alle illustraties inline SVG, viewBox 580 breed
- Toon: eerlijk, direct, geen marketingpraat
