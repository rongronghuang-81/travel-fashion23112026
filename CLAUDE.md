# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Pack Like a Local": a no-build, no-dependency static web app. Given destination country, month, trip length, gender and age group, it suggests clothes that locals wear, lets the user add them (plus custom items) to a packing list, and tick items off. Plain HTML/CSS/vanilla JS; state lives in `localStorage` (key `packLikeALocal.v1`).

## Running and testing

- Run: open `index.html` directly in a browser (no server or install needed). Note the Claude in-app browser renders `file://` pages as a `data:` snapshot where scripts and `localStorage` don't work; serve over HTTP instead (e.g. a small Node static server). `python3 -m http.server` failed in this environment because of macOS permissions on the Desktop folder.
- There is no package.json, linter or test framework. The suggestion engine is pure and runs in Node: `require('./data/suggest.js')` exposes `getSuggestions`, `BAND_NAMES`, `CATS`. Verify engine changes with an ad-hoc Node script that asserts on `getSuggestions(...)` output (e.g. southern-hemisphere seasons, modest-dress countries, age extras, unknown-country fallback, and no duplicate item ids across every country/month/gender/age combination).

## Architecture

Scripts load in order from `index.html`: `data/destinations.js` → `data/suggest.js` → `app.js`. The data files are IIFEs that work in both the browser (attach to `window`) and Node (`module.exports`); keep that dual pattern.

- `data/destinations.js`: curated per-country data (26 countries). Key fields: `t` (12-digit string, one digit per month Jan–Dec, climate band 0 cold <5°C … 4 hot 29°C+ based on daytime highs for the profile city in `region`), `r` (rainy months), `vibe`/`palette`/`avoid` (how locals dress), `modest` (`'full'` removes items tagged `bare` and adds a scarf; `'sites'` only adds a temple/church cover-up), `drop` (base item names locals rarely wear), `local` (extra items built with the `L(...)` helper: name, category, min/max band, genders `f`/`m`, why, qty). Southern-hemisphere seasons are encoded directly in `t`, not computed.
- `data/suggest.js`: `getSuggestions({country, month, days, gender, ageGroup, fallbackBand, fallbackRain})`. Pipeline: filter the `BASE` catalogue by band/gender/rain → apply country `drop` and modesty → merge country `local` items (same-name local items override base) → scale quantities by trip length (underwear/socks = min(days,7)+1; tops/bottoms ×0.5/1/1.5 for ≤3/≤7/>7 days; assumes laundry past a week) → age adjustments (child/senior extras) → dedupe by item name, assign slug `id`, sort by category. Unknown countries use `fallbackBand`/`fallbackRain` and return `meta.known = false`. Item names are used as identities (in `drop`, overrides, dedupe, and "already added" checks), so renaming a base item requires updating every `drop` reference.
- `app.js`: all UI and state. Builds DOM with the `h()` helper (no `innerHTML`; keep it that way for user-entered text). `state = {trip, items, hidePacked}` is saved on every change, and `render()` redraws suggestions, list and quick-add chips. List items are matched to suggestions by case-insensitive name. Quantities are fixed when an item is added, so changing the trip form later does not alter items already on the list.

## Adding a destination

Add an entry to `data/destinations.js` with a valid `t` string (12 digits, 0–4) and non-empty `vibe`, `palette`, `avoid`; the country appears in the datalist automatically. Countries not in this file fall back to weather-only suggestions with a "not locally tuned" notice.
