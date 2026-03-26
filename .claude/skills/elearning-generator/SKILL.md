---
name: elearning-generator
description: Genereer automatisch een complete interactieve e-learning HTML module vanuit een transcriptie of samenvatting. Gebruik deze skill wanneer de gebruiker een transcriptie, samenvatting of videocontent aanlevert en vraagt om een e-learning, cursus, module of leermateriaal te maken.
version: "3.0"
author: Umely
---

# E-learning Generator Skill

## Centrale bron van waarheid
De volledige generatie-instructies (huisstijl, CSS, JavaScript, structuur) staan in:

**`webapp/prompt.md`**

Lees dit bestand volledig voordat je begint met genereren. Alle CSS-variabelen, componentstijlen en JavaScript-logica staan daar exact beschreven. Volg die instructies letterlijk.

## Wanneer activeer je deze skill?
- Gebruiker geeft een transcriptie, samenvatting of tekst aan
- Gebruiker vraagt om een e-learning, cursus of module te maken
- Trefwoorden: "genereer e-learning", "maak cursus", "zet om naar module"

## Werkwijze

### Stap 1 — Lees de instructies
Lees `webapp/prompt.md` volledig. Dit is de authoratieve bron voor alle opmaak en structuur.

### Stap 2 — Analyseer het bronmateriaal
Identificeer uit de transcriptie:
- Hoofdonderwerp → wordt de module-titel
- 4-6 kernthema's → worden de modules
- Concrete feiten, tips, voorbeelden → voor quizvragen
- Niveau van de doelgroep → pas taalgebruik aan

### Stap 3 — Genereer het HTML-bestand
Volg de instructies uit `webapp/prompt.md` exact. Geen afwijkingen van de huisstijl.

Output: één volledig werkend HTML-bestand.
Sla op als: `output/elearning-[onderwerp]-[YYYYMMDD].html`

## Nooit doen
- Inter, Roboto of system-ui als primair font gebruiken
- Oranje of gradient als header-achtergrond
- Placeholder tekst laten staan
- Afwijken van de CSS-variabelen in prompt.md
