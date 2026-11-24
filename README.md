# 🧳 Pack Like a Local

A simple travel packing planner that helps you dress like the locals. Tell it where and when you're going, and it suggests what people there actually wear. Pick the pieces you like, add your own items, and tick things off as you pack.

## How to use

1. **Open `index.html`** in any web browser. There is nothing to install.
2. **Enter your trip**: destination country, month of travel, trip length (days), gender and age group.
3. **Read "What locals wear"**: you'll see the expected weather, how locals dress, their typical colours, and what they rarely wear. Each suggestion says why it's recommended, and items inspired by local style carry a *local style* badge.
4. **Build your packing list**: click **+ Add** on a suggestion, or **Add all** for a category or the whole set.
5. **Add your own items** (toiletries, shoes, documents, electronics, anything): type a name, choose a category and quantity, and press **Add**. The quick-add buttons cover common extras such as passport and phone charger.
6. **Tick items as you pack them.** The progress bar shows how much is done. You can hide packed items, untick everything, rename or remove items, or print the list.

Your list is saved in your browser, so it is still there when you come back (on the same browser and device).

## Good to know

- **Trip length changes quantities.** Underwear and socks follow the number of days, and tops and bottoms scale up or down. Trips longer than a week assume you can do laundry once. Quantities are fixed when you add an item, so edit them in the list if you change your trip length afterwards.
- **Countries covered:** Australia, Brazil, Canada, China, Egypt, France, Germany, Iceland, India, Italy, Japan, Mexico, Morocco, Netherlands, New Zealand, Singapore, South Africa, South Korea, Spain, Sweden, Thailand, Turkey, United Arab Emirates, United Kingdom, United States and Vietnam. For any other country you pick the typical weather yourself and get weather-based basics, with a notice that it isn't tuned to local style.
- **The style and climate data is hand-written** from general knowledge, not a live source. Treat it as a starting point and check conditions before you travel. Big countries use one city for the climate (shown in the summary).

## Project layout

Plain HTML, CSS and JavaScript with no build step.

- `index.html`, `styles.css`, `app.js`: the interface and list logic
- `data/destinations.js`: per-country climate and local-style data (add new countries here)
- `data/suggest.js`: the suggestion engine
