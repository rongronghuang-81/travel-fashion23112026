/*
 * getSuggestions({ country, month, gender, ageGroup, fallbackBand, fallbackRain })
 *   gender   : 'women' | 'men' | 'neutral'
 *   ageGroup : 'child' | 'teen' | 'adult' | 'mature' | 'senior'
 *   month    : 1-12
 * Pure and deterministic. Works in the browser (global getSuggestions) and Node (module.exports).
 */
(function (root) {
  const D = (typeof module !== 'undefined' && module.exports) ? require('./destinations.js') : root.DESTINATIONS;

  const BAND_NAMES = ['Cold (below 5°C)', 'Cool (5–14°C)', 'Mild (15–21°C)', 'Warm (22–28°C)', 'Hot (29°C and above)'];
  const CATS = ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories', 'Basics'];
  const GCODE = { women: 'f', men: 'm', neutral: 'n' };

  // i(name, category, minBand, maxBand, genders, qty, why, opts)
  const i = (item, cat, b0, b1, g, qty, why, o) => Object.assign({ item, cat, b: [b0, b1], g, qty, why }, o || {});

  const BASE = [
    // Tops
    i('Thermal base layer', 'Basics', 0, 0, 'fmn', 2, 'Warm base for cold days'),
    i('Chunky knit sweater', 'Tops', 0, 1, 'fmn', 2, 'Insulating mid-layer'),
    i('Long-sleeve top', 'Tops', 1, 2, 'fmn', 3, 'Core layering piece'),
    i('Light cardigan or overshirt', 'Tops', 2, 2, 'fmn', 1, 'Easy layer for changing temperatures'),
    i('T-shirts', 'Tops', 2, 4, 'fmn', 4, 'Everyday warm-weather top'),
    i('Breathable linen shirt', 'Tops', 3, 4, 'fmn', 2, 'Cool and presentable in heat'),
    i('Lightweight long-sleeve top', 'Tops', 3, 4, 'fmn', 2, 'Sun protection and extra coverage'),
    i('Sleeveless top', 'Tops', 3, 4, 'fmn', 2, 'Cool in the heat', { tags: ['bare'] }),
    // Bottoms
    i('Warm lined trousers or thick jeans', 'Bottoms', 0, 1, 'fmn', 2, 'Warmer legs for cold days'),
    i('Jeans or chinos', 'Bottoms', 1, 3, 'fmn', 2, 'Versatile everyday trousers'),
    i('Lightweight trousers', 'Bottoms', 3, 4, 'fmn', 2, 'Cool coverage in heat'),
    i('Shorts', 'Bottoms', 3, 4, 'fmn', 2, 'Hot-weather option', { tags: ['bare'] }),
    i('Knit dress or skirt with tights', 'Bottoms', 0, 1, 'f', 2, 'Warm dressy option'),
    i('Midi dress or skirt', 'Bottoms', 2, 4, 'f', 2, 'Easy, coverage-friendly option'),
    // Outerwear
    i('Heavy winter coat', 'Outerwear', 0, 0, 'fmn', 1, 'Essential for sub-5°C days'),
    i('Mid-weight wool coat', 'Outerwear', 1, 1, 'fmn', 1, 'Smart and warm for cool days'),
    i('Light jacket', 'Outerwear', 2, 2, 'fmn', 1, 'Mild days and cooler evenings'),
    i('Light rain jacket', 'Outerwear', 1, 4, 'fmn', 1, 'Rain is likely this month', { rain: true }),
    i('Compact umbrella', 'Accessories', 0, 4, 'fmn', 1, 'Rain is likely this month', { rain: true }),
    // Footwear
    i('Insulated waterproof boots', 'Footwear', 0, 0, 'fmn', 1, 'Dry, warm feet in the cold'),
    i('Leather ankle boots', 'Footwear', 1, 1, 'fmn', 1, 'Smart and weather-ready'),
    i('Comfortable walking sneakers', 'Footwear', 1, 3, 'fmn', 1, 'You will walk a lot'),
    i('Breathable walking shoes', 'Footwear', 4, 4, 'fmn', 1, 'Ventilated shoes for hot-weather walking'),
    i('Sandals', 'Footwear', 3, 4, 'fmn', 1, 'Cool for warm days'),
    // Accessories
    i('Warm hat and gloves', 'Accessories', 0, 0, 'fmn', 1, 'Protect extremities in the cold'),
    i('Scarf', 'Accessories', 0, 1, 'fmn', 1, 'Warmth and a local-style finishing touch'),
    i('Sun hat and sunglasses', 'Accessories', 2, 4, 'fmn', 1, 'Sun protection'),
    // Basics
    i('Underwear', 'Basics', 0, 4, 'fmn', 7, 'One per day, plus a spare'),
    i('Socks', 'Basics', 0, 4, 'fmn', 7, 'One pair per day, plus a spare'),
    i('Sleepwear', 'Basics', 0, 4, 'fmn', 2, 'Comfortable nights'),
    i('Swimwear', 'Basics', 3, 4, 'fmn', 1, 'For pools or beaches'),
    i('Smart outfit for evenings', 'Basics', 0, 4, 'fmn', 1, 'Smart-casual options for dining out', { tags: ['adult'] })
  ];

  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function getSuggestions(opts) {
    const { country, month, gender = 'neutral', ageGroup = 'adult' } = opts;
    const g = GCODE[gender] || 'n';
    const d = D[country];

    let band, rain;
    if (d) {
      band = Number(d.t[month - 1]);
      rain = d.r.indexOf(month) !== -1;
    } else {
      band = Number.isInteger(opts.fallbackBand) ? opts.fallbackBand : 2;
      rain = !!opts.fallbackRain;
    }
    const inBand = x => band >= x.b[0] && band <= x.b[1];
    const fits = x => inBand(x) && x.g.indexOf(g) !== -1 && (!x.rain || rain);

    const drop = new Set((d && d.drop) || []);
    const modestFull = d && d.modest === 'full';
    const modestSites = d && d.modest === 'sites';

    let out = BASE.filter(fits)
      .filter(x => !drop.has(x.item))
      .filter(x => !(modestFull && (x.tags || []).includes('bare')))
      .filter(x => !(ageGroup === 'child' && (x.tags || []).includes('adult')))
      .map(x => Object.assign({}, x));

    // Local style items (take priority over base items of the same name)
    const local = ((d && d.local) || []).filter(fits).map(x => Object.assign({}, x, { local: true }));
    const localNames = new Set(local.map(x => x.item));
    out = out.filter(x => !localNames.has(x.item)).concat(local);

    // Modesty extras
    if (modestFull && band >= 2 && !localNames.has('Light scarf or shawl')) {
      out.push({ item: 'Light scarf or shawl', cat: 'Accessories', qty: 1, local: true, g: 'fmn',
        why: 'Keeps shoulders covered, the local norm' });
    }
    if (modestSites && band >= 2 && !out.some(x => /scarf/i.test(x.item) && x.cat === 'Accessories')) {
      out.push({ item: 'Scarf or sarong for temples/churches', cat: 'Accessories', qty: 1, local: true, g: 'fmn',
        why: 'Cover shoulders and knees at religious sites' });
    }

    // Trip length: scale quantities. Assumes you can do laundry on trips over a week.
    const days = Math.max(1, Math.min(90, Math.round(Number(opts.days) || 7)));
    const factor = days <= 3 ? 0.5 : days <= 7 ? 1 : 1.5;
    out.forEach(x => {
      if (x.item === 'Underwear' || x.item === 'Socks') x.qty = Math.min(days, 7) + 1;
      else if (x.item === 'Sleepwear') x.qty = days <= 3 ? 1 : 2;
      else if (x.cat === 'Tops' || x.cat === 'Bottoms') x.qty = Math.max(1, Math.round(x.qty * factor));
    });

    // Age adjustments
    if (ageGroup === 'child') {
      out.forEach(x => { if (['Tops', 'Bottoms'].includes(x.cat)) x.qty += 2; });
      out.push({ item: 'Spare outfit for the day bag', cat: 'Basics', qty: 1, g: 'fmn', why: 'Kids spill, splash and sweat' });
      out.push({ item: 'Easy-wash layers', cat: 'Tops', qty: 2, g: 'fmn', why: 'Quick to dry and easy to replace' });
    }
    if (ageGroup === 'senior') {
      out.push({ item: 'Cushioned slip-resistant walking shoes', cat: 'Footwear', qty: 1, g: 'fmn', why: 'Comfort and stability on long days' });
      if (band <= 2) out.push({ item: 'Extra warm layer', cat: 'Outerwear', qty: 1, g: 'fmn', why: 'Easy to add when it turns chilly' });
      out.push({ item: 'Compression socks for flights', cat: 'Basics', qty: 1, g: 'fmn', why: 'Comfort on long journeys' });
    }
    if (ageGroup === 'mature' && band <= 1) {
      out.push({ item: 'Extra warm layer', cat: 'Outerwear', qty: 1, g: 'fmn', why: 'Easy to add when it turns chilly' });
    }

    // Stable de-dupe, assign ids, sort by category
    const seen = new Set();
    out = out.filter(x => (seen.has(x.item) ? false : seen.add(x.item)));
    out.forEach(x => { x.id = slug(x.item); });
    out.sort((a, b) => CATS.indexOf(a.cat) - CATS.indexOf(b.cat));

    return {
      items: out,
      meta: {
        known: !!d,
        country, month, days, laundry: days > 7, band, bandName: BAND_NAMES[band], rain,
        region: d ? d.region : null,
        vibe: d ? d.vibe : null,
        palette: d ? d.palette : null,
        avoid: d ? d.avoid : null,
        modest: d ? d.modest || null : null
      }
    };
  }

  const api = { getSuggestions, BAND_NAMES, CATS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else Object.assign(root, api);
})(typeof window !== 'undefined' ? window : globalThis);
