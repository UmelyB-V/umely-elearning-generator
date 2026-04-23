# Toon- en schrijfkwaliteitscheck — Design Spec

Datum: 2026-04-13

## Doel

Alle 32 modules in `module-content/` controleren op schrijfkwaliteitsproblemen en deze direct fixen. Na afloop zijn alle modules vrij van AI-opvulling, vage platitudes, tijdsgebonden taal en inconsistent taalgebruik.

## Scope

**In scope:**
- Alle 32 `elearning-*.html` bestanden in `module-content/`
- Directe tekstcorrecties in de HTML
- Update van `content-audit.md` met actuele bevindingen

**Buiten scope:**
- Structurele herschrijvingen of nieuwe inhoud
- CSS, JavaScript, navigatie-logica
- SVG-illustraties (tenzij tekst erin tijdsgebonden is)

## Criteria

| Criterium | Wat te zoeken |
|---|---|
| AI-opvulling | Loze zinnen zonder concrete inhoud: "blijf experimenteren", "mogelijkheden zijn eindeloos", "gebruik Claude verstandig" |
| Vage platitudes | Uitspraken zonder concrete handeling, voorbeeld of vervolgstap: "controleer altijd", waarschuwingen zonder handelingsperspectief |
| Tijdsgebonden taal | "op dit moment", "momenteel", "binnenkort", "nieuwste versie", concrete prijzen (€/$/bedragen), versienummers, "in ontwikkeling" |
| Inconsistent taalgebruik | Wisselend je/u, variërende naamgeving voor hetzelfde concept, inconsistente stijl tussen modules |

## Fix-aanpak

Voor elke gevonden issue:
1. Exacte zin noteren (module, scherm-ID)
2. Directe fix toepassen in de HTML
3. Bevinding documenteren in `content-audit.md`

**Fix-principes:**
- Tijdsgebonden claim → tijdloos herformuleren of verwijzen naar actuele bron
- Platitude zonder actie → concrete handeling of voorbeeld toevoegen, of zin verwijderen
- AI-opvulling → verwijderen of vervangen door specifieke inhoud
- Inconsistentie → aanpassen aan de dominante stijl van de module

## Volgorde

A1 → A2 → A3 → A4 → B1 → B2 → B3 → B4 → C1 → C2 → C3 → C4 → C5 → C6 → C7 → C8 → D1 → D2 → D3 → D4 → D5 → E1 → E2 → E3 → E4 → E5 → E6 → E7 → E8 → I0 → I1 → I2

## Output

- 32 gecorrigeerde HTML-bestanden in `module-content/`
- Vernieuwde `content-audit.md` (verouderde entries vervangen door actuele bevindingen)
