---
name: elearning-generator
description: Genereer automatisch een complete interactieve e-learning HTML module vanuit een transcriptie of samenvatting. Gebruik deze skill wanneer de gebruiker een transcriptie, samenvatting of videocontent aanlevert en vraagt om een e-learning, cursus, module of leermateriaal te maken.
version: "4.0"
author: Umely
---

# E-learning Generator Skill

## Centrale bron van waarheid
De volledige generatie-instructies (huisstijl, CSS, JavaScript, componentenbibliotheek) staan in:

**`webapp/prompt.md`**

Lees dit bestand volledig voordat je begint met genereren. Alle CSS-variabelen, componentstijlen, JavaScript-logica en de 14 beschikbare componenten staan daar exact beschreven. Volg die instructies letterlijk.

## Wanneer activeer je deze skill?
- Gebruiker geeft een transcriptie, samenvatting of tekst aan
- Gebruiker vraagt om een e-learning, cursus of module te maken
- Trefwoorden: "genereer e-learning", "maak cursus", "zet om naar module"

## Werkwijze

### Stap 1 - Lees de instructies
Lees `webapp/prompt.md` volledig. Dit is de authoratieve bron voor alle opmaak, componenten en structuur.

### Stap 2 - Analyseer het bronmateriaal
Identificeer uit de transcriptie:
- Hoofdonderwerp, wordt de module-titel
- 4-8 kernthema's, worden de modules
- Concrete feiten, tips, voorbeelden, voor interacties en quizvragen
- Niveau van de doelgroep, pas taalgebruik aan
- Geschikte componenttypen per thema (processen? stappenuitleg. Termen? flashcards. Vergelijking? tabel.)

### Stap 3 - Plan de componentmix
Voordat je begint met HTML schrijven, plan welke componenten je per module gebruikt.
Zorg voor:
- Minimaal 5 verschillende componenttypen in totaal
- Nooit twee dezelfde interactievormen achter elkaar
- Elke module minimaal 1 interactief of visueel component
- Maximaal 2 tekstcomponenten achter elkaar

### Stap 4 - Genereer het HTML-bestand
Volg de instructies uit `webapp/prompt.md` exact. Geen afwijkingen van de huisstijl.
Output: een volledig werkend HTML-bestand.
Sla op als: `output/elearning-[onderwerp]-[YYYYMMDD].html`

### Stap 5 - Test lokaal voor opslaan
Voer altijd een geautomatiseerde test uit op het gegenereerde bestand voordat het naar Supabase gaat:

```bash
node test-elearning.js output/elearning-[bestand].html
```

Controleer minimaal:
- Start-knop aanwezig en linkt naar screen-module-1
- Alle kennischecks: `id="kc-N"` en `id="kc-feedback-N"` aanwezig
- Quiz-IDs aanwezig: `quiz-voortgang`, `quiz-vraag-tekst`, `quiz-opties`, `quiz-feedback`, `quiz-volgende-btn`
- Resultaat-IDs aanwezig: `score-display`, `resultaat-boodschap`, `certificaat-blok`, `cert-datum`
- Alle functies top-level gedefinieerd (niet in DOMContentLoaded)
- SCHERMEN-array compleet met alle screen-IDs
- Minimaal 5 verschillende componenttypen gebruikt

**Pas na een geslaagde test mag de module in Supabase worden opgeslagen.**

## Nooit doen
- Inter, Roboto of system-ui als primair font gebruiken
- Oranje of gradient als header-achtergrond
- Placeholder tekst laten staan
- Afwijken van de CSS-variabelen in prompt.md
- Dezelfde structuur in elke module (altijd varieren)
- Marketingpraat of overdreven claims
- M-dashes gebruiken
