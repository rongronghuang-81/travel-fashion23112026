/*
 * Curated destination data.
 *
 * t      : 12 digits (Jan..Dec) of typical daytime climate band for the profile city:
 *          0 cold (<5°C) · 1 cool (5–14°C) · 2 mild (15–21°C) · 3 warm (22–28°C) · 4 hot (29°C+)
 * r      : months (1-12) when rain is likely
 * region : which city/region the climate profile represents
 * vibe / palette / avoid : how locals dress
 * modest : 'full' (shoulders+knees covered in public) | 'sites' (only at temples/churches/mosques)
 * drop   : base item names that locals rarely wear (removed from suggestions)
 * local  : extra items locals wear. L(name, category, minBand, maxBand, genders, why, qty)
 *          genders: any of f (women) m (men)
 */
(function (root) {
  const L = (item, cat, b0, b1, g, why, qty) => ({ item, cat, b: [b0, b1], g: g || 'fm', why, qty: qty || 1 });
  const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const D = {
    'Japan': {
      region: 'Tokyo', t: '111233443321', r: [6, 7, 9],
      vibe: 'Polished, layered and understated. Clean lines, coordinated outfits, and covered shoulders and knee-length hems are the norm in cities, even in summer.',
      palette: 'Black, navy, grey, beige, olive',
      avoid: 'Loud logos, very revealing tops, gym wear outside the gym',
      local: [
        L('Trench coat or lightweight mac', 'Outerwear', 1, 2, 'fm', 'Locals wear trench-style coats in spring and autumn'),
        L('Wide-leg or tapered trousers', 'Bottoms', 1, 3, 'fm', 'Roomy, tapered cuts are everywhere in Tokyo'),
        L('Slip-on shoes', 'Footwear', 0, 4, 'fm', 'You remove shoes at temples, ryokan and many restaurants'),
        L('Small hand towel', 'Accessories', 3, 4, 'fm', 'Locals carry a hand towel to deal with humid summers')
      ]
    },
    'South Korea': {
      region: 'Seoul', t: '001123442110', r: [7, 8],
      vibe: 'Trend-aware and clean. Oversized knits, tailored coats and white sneakers dominate; winters call for long padded coats.',
      palette: 'Black, white, grey, soft pastels, camel',
      avoid: 'Beachwear in the city, mismatched athletic gear',
      drop: ['Heavy winter coat'],
      local: [
        L('Long padded puffer coat', 'Outerwear', 0, 0, 'fm', 'Knee-length puffers are the Seoul winter uniform'),
        L('Oversized knit or cardigan', 'Tops', 0, 2, 'fm', 'Oversized knits are a staple'),
        L('Clean white sneakers', 'Footwear', 1, 4, 'fm', 'White sneakers go with almost every Seoul outfit'),
        L('Straight-cut or wide-leg jeans', 'Bottoms', 1, 3, 'fm', 'Relaxed cuts have replaced skinny jeans'),
        L('Cap or bucket hat', 'Accessories', 3, 4, 'fm', 'Popular for sun and style in summer')
      ]
    },
    'China': {
      region: 'Beijing', t: '001223442110', r: [7, 8],
      vibe: 'Practical and fairly modest. Long down jackets in winter; light, covered-up layers in summer, partly for sun protection.',
      palette: 'Dark neutrals, navy, grey; brighter colours among younger people',
      avoid: 'Very revealing outfits',
      drop: ['Heavy winter coat'],
      local: [
        L('Long down jacket', 'Outerwear', 0, 0, 'fm', 'Long down coats are standard in northern winters'),
        L('UV-protective light layer', 'Outerwear', 3, 4, 'fm', 'Locals cover arms against the sun'),
        L('Face masks', 'Accessories', 0, 1, 'fm', 'Common on polluted or cold, dry days')
      ]
    },
    'Thailand': {
      region: 'Bangkok', t: '344444444443', r: [5, 6, 7, 8, 9, 10], modest: 'sites',
      vibe: 'Light cotton and linen, tees, loose trousers, sundresses. Cities and offices are neater than beach towns. Shoulders and knees must be covered at temples.',
      palette: 'White, pastels, bright cotton prints',
      avoid: 'Swimwear or bare torsos away from the beach; tank tops and shorts inside temples',
      local: [
        L('Loose lightweight cotton trousers', 'Bottoms', 3, 4, 'fm', 'Airy trousers are what locals wear in the heat'),
        L('Slip-on sandals', 'Footwear', 3, 4, 'fm', 'Shoes come off at temples, homes and shops'),
        L('Compact poncho or umbrella', 'Accessories', 3, 4, 'fm', 'Rainy-season downpours are sudden', 1)
      ]
    },
    'Vietnam': {
      region: 'Hanoi (Ho Chi Minh City is hot all year)', t: '222344444322', r: [5, 6, 7, 8, 9], modest: 'sites',
      vibe: 'Light cotton and practical. Motorbike riders wear long sleeves, masks and sun jackets. Cover shoulders and knees at pagodas.',
      palette: 'Light neutrals, soft colours',
      avoid: 'Beachwear in the city, sleeveless tops in pagodas',
      local: [
        L('Lightweight sun-protection jacket', 'Outerwear', 3, 4, 'fm', 'Locals wear thin long-sleeve jackets against sun and dust'),
        L('Face mask or neck buff', 'Accessories', 2, 4, 'fm', 'Used on bikes and in traffic'),
        L('Light cotton long trousers', 'Bottoms', 2, 4, 'fm', 'Preferred over shorts in cities'),
        L('Compact poncho', 'Outerwear', 2, 4, 'fm', 'Ponchos are the local rain solution')
      ]
    },
    'Singapore': {
      region: 'Singapore', t: '444444444444', r: [11, 12, 1, 2],
      vibe: 'Hot, humid and heavily air-conditioned. Locals wear light breathable outfits and carry a thin layer for malls and trains. Smart casual is common in the city.',
      palette: 'Light, bright cotton, pastels',
      avoid: 'Heavy fabrics and jeans at midday',
      local: [
        L('Thin layer for air-conditioning', 'Outerwear', 3, 4, 'fm', 'Malls, trains and offices are very cold'),
        L('Quick-dry breathable tops', 'Tops', 3, 4, 'fm', 'Humidity makes quick-dry fabrics ideal', 3),
        L('Compact umbrella', 'Accessories', 3, 4, 'fm', 'Used for both sun and sudden rain')
      ]
    },
    'India': {
      region: 'Delhi', t: '123444444321', r: [7, 8, 9], modest: 'full',
      vibe: 'Modesty is valued: shoulders and knees are typically covered, especially for women. Cotton kurtas, long skirts and light trousers dominate, often with a scarf. Big cities are more Western-casual.',
      palette: 'Jewel tones, florals, block prints',
      avoid: 'Shorts, short skirts, sleeveless or low-cut tops',
      local: [
        L('Long cotton kurta or tunic', 'Tops', 2, 4, 'fm', 'The everyday local top: cool, loose and modest'),
        L('Dupatta or large scarf', 'Accessories', 1, 4, 'f', 'Worn over the shoulders; useful at temples'),
        L('Loose cotton trousers', 'Bottoms', 2, 4, 'fm', 'Locals choose loose over fitted in the heat'),
        L('Wool shawl or warm wrap', 'Outerwear', 0, 1, 'fm', 'Delhi winters are chilly morning and night'),
        L('Easy slip-on shoes', 'Footwear', 1, 4, 'fm', 'Shoes come off at temples and homes')
      ]
    },
    'United Arab Emirates': {
      region: 'Dubai', t: '223444444432', r: [1, 2, 12], modest: 'full',
      vibe: 'Locals wear the kandura and abaya. Visitors dress smart casual: shoulders and knees covered in malls and public spaces. Indoors the air-conditioning is icy.',
      palette: 'White, black, neutrals, sand tones',
      avoid: 'Revealing clothing in public spaces; swimwear anywhere except pools and beaches',
      local: [
        L('Light scarf or wrap', 'Accessories', 2, 4, 'f', 'Shoulders covered in malls, plus cold air-conditioning'),
        L('Maxi dress or loose long skirt', 'Bottoms', 3, 4, 'f', 'Long, flowing and cool'),
        L('Smart casual shirt', 'Tops', 3, 4, 'm', 'Collared shirts are the everyday smart-casual look'),
        L('Thin layer for air-conditioning', 'Outerwear', 3, 4, 'fm', 'Interiors are very cold')
      ]
    },
    'Turkey': {
      region: 'Istanbul', t: '111123332211', r: [11, 12, 1, 2, 3], modest: 'sites',
      vibe: 'Istanbul is stylish and European; the coast is relaxed and light. Cover shoulders and knees, and bring a scarf, for mosques.',
      palette: 'Earth tones, navy, black, white',
      avoid: 'Beachwear away from the coast, bare shoulders in mosques',
      local: [
        L('Light scarf', 'Accessories', 1, 4, 'f', 'For mosques and cool evenings'),
        L('Stylish leather jacket or blazer', 'Outerwear', 1, 2, 'fm', 'Istanbulites dress up their layers'),
        L('Fashionable clean sneakers', 'Footwear', 1, 4, 'fm', 'Smart sneakers work all day and evening')
      ]
    },
    'Egypt': {
      region: 'Cairo', t: '122334443322', r: [], modest: 'full',
      vibe: 'Conservative outside resorts: loose, long, breathable clothing with shoulders and knees covered. Many women wear headscarves; men rarely wear shorts.',
      palette: 'Light neutrals, white, soft earth tones',
      avoid: 'Shorts, mini skirts, sleeveless tops outside resorts',
      local: [
        L('Loose linen or cotton long trousers', 'Bottoms', 2, 4, 'fm', 'The most common cool, covered option'),
        L('Large scarf', 'Accessories', 1, 4, 'fm', 'Sun, dust and mosques'),
        L('Closed comfortable shoes for ruins', 'Footwear', 2, 4, 'fm', 'Sand and uneven ground at sites'),
        L('Long dress or maxi skirt', 'Bottoms', 3, 4, 'f', 'Modest and cool')
      ]
    },
    'Morocco': {
      region: 'Marrakech', t: '112233443321', r: [11, 12, 1, 2, 3], modest: 'full',
      vibe: 'Modest, loose and layered. Shoulders and knees are covered; the djellaba is common. Evenings and the desert get cold.',
      palette: 'Terracotta, indigo, white, earth tones',
      avoid: 'Shorts, tight or sleeveless tops, especially in medinas',
      local: [
        L('Light scarf or shawl', 'Accessories', 1, 4, 'f', 'Sun, dust, and a quick cover-up'),
        L('Long loose dress or skirt', 'Bottoms', 2, 4, 'f', 'Common among local women'),
        L('Warm layer for evenings and desert', 'Outerwear', 1, 4, 'fm', 'Temperatures drop fast after dark'),
        L('Comfortable slip-on shoes', 'Footwear', 1, 4, 'fm', 'For cobbled medinas and shoes-off riads')
      ]
    },
    'South Africa': {
      region: 'Cape Town', t: '333221112233', r: [5, 6, 7, 8],
      vibe: 'Casual and outdoorsy, smart casual in the city. Layers matter: mornings and evenings are cool. On safari, wear khaki, olive or tan.',
      palette: 'Earth tones, khaki, olive, denim; brighter colours in summer',
      avoid: 'Bright colours, white and dark blue on safari',
      local: [
        L('Khaki or olive safari layers', 'Tops', 2, 4, 'fm', 'Neutral colours work best on safari', 2),
        L('Fleece or light puffer for mornings', 'Outerwear', 1, 2, 'fm', 'Cool starts, warm middays'),
        L('Smart casual outfit for dining', 'Basics', 1, 4, 'fm', 'Restaurants are smart casual')
      ]
    },
    'United Kingdom': {
      region: 'London', t: '111122332111', r: ALL,
      vibe: 'Practical layers for changeable weather. Smart casual: jeans, knitwear, trainers and a hooded rain jacket. People rarely stick with an umbrella in the wind.',
      palette: 'Navy, grey, black, olive, denim',
      avoid: 'Shorts and flip-flops in the city outside heatwaves; bright tourist logos',
      local: [
        L('Waterproof jacket with hood', 'Outerwear', 0, 4, 'fm', 'Local rain uniform: hood beats umbrella'),
        L('Smart trainers or ankle boots', 'Footwear', 0, 4, 'fm', 'Smart trainers go from daytime to the pub'),
        L('Knitwear layer', 'Tops', 0, 2, 'fm', 'Layering is the answer to four seasons in a day')
      ]
    },
    'France': {
      region: 'Paris', t: '111223332111', r: [10, 11, 12, 5, 6], modest: 'sites', drop: ['Shorts', 'Sleeveless top'],
      vibe: 'Understated chic: well-fitted basics, minimal logos and a neutral palette. Scarves and clean sneakers are everywhere. Parisians rarely wear shorts, gym wear or flip-flops in town.',
      palette: 'Navy, white, camel, black, stripes',
      avoid: 'Shorts, gym wear and flip-flops in the city; big logos',
      local: [
        L('Breton striped top', 'Tops', 1, 3, 'fm', 'The classic French casual top'),
        L('Classic trench or wool coat', 'Outerwear', 1, 2, 'fm', 'Parisian staple'),
        L('Scarf', 'Accessories', 0, 2, 'fm', 'Scarves finish nearly every Paris outfit'),
        L('Clean leather sneakers or loafers', 'Footwear', 1, 4, 'fm', 'Smart-casual shoes that handle walking')
      ]
    },
    'Italy': {
      region: 'Rome', t: '111223443211', r: [10, 11, 12], modest: 'sites', drop: ['Shorts'],
      vibe: 'Polished and tailored even when casual: linen shirts, fitted trousers, loafers and good sunglasses. Churches require covered shoulders and knees.',
      palette: 'Earth tones, navy, cream, linen',
      avoid: 'Gym wear, flip-flops and beachwear in cities; bare shoulders in churches',
      local: [
        L('Tailored trousers or chinos', 'Bottoms', 1, 4, 'fm', 'Italians favour fitted, ironed trousers over shorts'),
        L('Loafers or leather sneakers', 'Footwear', 1, 4, 'fm', 'Smart footwear is a point of pride'),
        L('Light scarf for churches', 'Accessories', 2, 4, 'f', 'Cover shoulders at churches'),
        L('Good sunglasses', 'Accessories', 2, 4, 'fm', 'Almost everyone wears them')
      ]
    },
    'Spain': {
      region: 'Madrid', t: '111223443211', r: [3, 4, 10, 11], modest: 'sites',
      vibe: 'Elegant casual, dressier in the evening, with late dinners. Summers are very hot (linen, espadrilles) while inland winters are properly cold.',
      palette: 'Light linen, white, earth tones, black',
      avoid: 'Beachwear in towns; bare shoulders in churches',
      local: [
        L('Espadrilles or leather sandals', 'Footwear', 3, 4, 'fm', 'Typical Spanish summer shoes'),
        L('Light scarf', 'Accessories', 1, 4, 'f', 'Cool evenings, and churches'),
        L('Linen trousers', 'Bottoms', 3, 4, 'fm', 'Light and elegant for hot days')
      ]
    },
    'Germany': {
      region: 'Berlin', t: '001122332110', r: [6, 7, 8],
      vibe: 'Practical and functional: outdoor jackets, sturdy shoes, jeans and layers. Casual dress is accepted almost everywhere; Berlin leans alternative and dark.',
      palette: 'Black, grey, navy, olive',
      avoid: 'Overly formal outfits for sightseeing',
      local: [
        L('Functional waterproof jacket', 'Outerwear', 0, 3, 'fm', 'Outdoor-brand shells are everyday wear'),
        L('Sturdy comfortable shoes', 'Footwear', 0, 3, 'fm', 'Locals walk and cycle a lot'),
        L('Wool or fleece mid-layer', 'Tops', 0, 2, 'fm', 'Layering is standard')
      ]
    },
    'Netherlands': {
      region: 'Amsterdam', t: '111122232111', r: ALL,
      vibe: 'Practical for cycling, wind and rain: waterproof jacket, trousers that suit a bike seat, sneakers. Casual and unfussy.',
      palette: 'Dark tones, denim, neutrals',
      avoid: 'Fragile shoes for cobbles and bikes',
      local: [
        L('Wind and waterproof jacket', 'Outerwear', 0, 3, 'fm', 'Essential for cycling in all weathers'),
        L('Sturdy sneakers', 'Footwear', 0, 4, 'fm', 'Cobbles and bike pedals'),
        L('Warm scarf', 'Accessories', 0, 1, 'fm', 'Wind off the North Sea')
      ]
    },
    'Sweden': {
      region: 'Stockholm', t: '000112221100', r: [7, 8, 9], drop: ['Thermal base layer', 'Heavy winter coat'],
      vibe: 'Minimalist, quality basics and serious winter layering: merino, down and wool. Buildings are warm indoors, and shoes come off at homes.',
      palette: 'Black, grey, beige, white, muted tones',
      avoid: 'Showy logos, thin clothing for winter',
      local: [
        L('Merino wool base layer', 'Basics', 0, 1, 'fm', 'Merino is the Swedish winter foundation', 2),
        L('Down jacket', 'Outerwear', 0, 0, 'fm', 'Locals choose down for deep cold'),
        L('Easy slip-on shoes', 'Footwear', 0, 4, 'fm', 'Shoes come off indoors')
      ]
    },
    'Iceland': {
      region: 'Reykjavik', t: '000011111000', r: ALL, drop: ['Chunky knit sweater', 'Heavy winter coat'],
      vibe: 'Dress for wind and rain: waterproof shells over wool layers. Outdoor gear is normal everywhere, even in Reykjavik.',
      palette: 'Practical outdoor colours; black, navy, grey, wool tones',
      avoid: 'Jeans on hikes, cotton layers that stay wet',
      local: [
        L('Lopapeysa-style wool sweater', 'Tops', 0, 2, 'fm', 'The traditional Icelandic wool sweater'),
        L('Waterproof shell jacket and trousers', 'Outerwear', 0, 2, 'fm', 'Wind and rain are constant'),
        L('Insulated parka', 'Outerwear', 0, 0, 'fm', 'Cold, windy winters'),
        L('Waterproof hiking boots', 'Footwear', 0, 2, 'fm', 'Locals hike in all seasons'),
        L('Swimwear (geothermal pools)', 'Basics', 0, 4, 'fm', 'Pool culture is a daily thing')
      ]
    },
    'United States': {
      region: 'New York (climate varies hugely by region)', t: '001123332110', r: [3, 4, 5, 7, 8],
      vibe: 'Very casual and regional. Jeans, sneakers, hoodies and athleisure are accepted nearly everywhere. New York is darker and more fashion-forward, California is relaxed.',
      palette: 'Denim, black, grey, sporty basics',
      avoid: 'Little. Dress in the layers your region needs',
      local: [
        L('Hoodie or fleece', 'Tops', 0, 2, 'fm', 'Everyday casual layer'),
        L('Light layer for air-conditioning', 'Outerwear', 3, 4, 'fm', 'Interiors are cooled hard in summer'),
        L('Comfortable sneakers', 'Footwear', 0, 4, 'fm', 'Sneakers are worn with everything')
      ]
    },
    'Canada': {
      region: 'Toronto', t: '000122332110', r: [4, 5, 6, 9, 10],
      vibe: 'Practical and winter-ready: quality parkas and boots, with plaid, fleece and jeans. Layers matter because buildings are well heated.',
      palette: 'Plaid, navy, black, forest green, neutrals',
      avoid: 'Thin coats and non-grip shoes in winter',
      drop: ['Heavy winter coat'],
      local: [
        L('Insulated parka', 'Outerwear', 0, 0, 'fm', 'Canadian winter standard'),
        L('Fleece mid-layer', 'Tops', 0, 2, 'fm', 'Layering for heated interiors'),
        L('Winter boots with grip', 'Footwear', 0, 0, 'fm', 'Ice and snow')
      ]
    },
    'Mexico': {
      region: 'Mexico City (altitude) and the coast is hotter', t: '223332222222', r: [6, 7, 8, 9],
      modest: 'sites', drop: ['Shorts'],
      vibe: 'Mexico City is smart casual: jeans, light layers and cool evenings at altitude. Coastal areas are light and loose. Cover up for churches.',
      palette: 'Denim, embroidered detail, bright accents, earth tones',
      avoid: 'Shorts and beachwear in the city; bare shoulders in churches',
      local: [
        L('Light jacket for cool evenings (altitude)', 'Outerwear', 2, 3, 'fm', 'Evenings drop to jacket weather'),
        L('Comfortable closed walking shoes', 'Footwear', 2, 3, 'fm', 'Uneven pavements'),
        L('Embroidered blouse or top', 'Tops', 2, 3, 'f', 'Local craft, widely worn')
      ]
    },
    'Brazil': {
      region: 'Rio de Janeiro', t: '444333333334', r: [12, 1, 2, 3],
      vibe: 'Casual, bright and fitted. Beach culture is central, with sleeker styling in São Paulo. Bring a layer for air-conditioning and the cooler south.',
      palette: 'Bright colours, white, tropical prints',
      avoid: 'Formal wear by day, heavy layers',
      local: [
        L('Flip-flops', 'Footwear', 3, 4, 'fm', 'Casual everyday shoe near the coast'),
        L('Beach cover-up or sarong', 'Accessories', 3, 4, 'fm', 'Used between beach and street'),
        L('Swimwear', 'Basics', 3, 4, 'fm', 'Beach culture is daily life', 2),
        L('Light layer for air-conditioning', 'Outerwear', 3, 4, 'fm', 'Buses and malls are cold')
      ]
    },
    'Australia': {
      region: 'Sydney (Melbourne is cooler and changeable)', t: '333221112233', r: [3, 4, 5, 6],
      vibe: 'Casual and outdoorsy: linen, tees, shorts, thongs (flip-flops) and a sun hat. Sun protection is a way of life.',
      palette: 'Neutral and sunny, with denim, white and coastal colours',
      avoid: 'Heavy or formal clothing in the heat',
      local: [
        L('Wide-brim hat or cap', 'Accessories', 2, 4, 'fm', 'Sun protection is standard'),
        L('Flip-flops (thongs)', 'Footwear', 3, 4, 'fm', 'Casual everyday shoe'),
        L('Light layer for evenings', 'Outerwear', 2, 3, 'fm', 'Evenings turn cool'),
        L('Swim shirt or rash vest', 'Basics', 3, 4, 'fm', 'UV is strong')
      ]
    },
    'New Zealand': {
      region: 'Auckland', t: '332221112223', r: [5, 6, 7, 8],
      vibe: 'Outdoorsy and layered, with merino, puffers and trail shoes. Four seasons in a day is normal.',
      palette: 'Black, grey, olive, merino tones',
      avoid: 'Cotton on hikes; underdressing for sudden weather',
      local: [
        L('Merino layers', 'Tops', 0, 2, 'fm', 'Kiwi staple: warm, light and odour-free', 2),
        L('Light puffer or fleece', 'Outerwear', 0, 2, 'fm', 'Packs small, warm when it turns'),
        L('Jandals (flip-flops)', 'Footwear', 3, 4, 'fm', 'The Kiwi word for flip-flops')
      ]
    }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  else root.DESTINATIONS = D;
})(typeof window !== 'undefined' ? window : globalThis);
