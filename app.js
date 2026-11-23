(function () {
  const KEY = 'packLikeALocal.v1';
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const LIST_CATS = ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories', 'Basics', 'Toiletries', 'Electronics', 'Documents', 'Other'];
  const QUICK = [
    ['Toothbrush & toothpaste', 'Toiletries'], ['Shampoo & soap', 'Toiletries'], ['Sunscreen', 'Toiletries'],
    ['Medications', 'Toiletries'], ['Phone charger', 'Electronics'], ['Travel adapter', 'Electronics'],
    ['Power bank', 'Electronics'], ['Passport', 'Documents'], ['Travel insurance', 'Documents'], ['Wallet & cards', 'Documents']
  ];

  const $ = id => document.getElementById(id);
  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else if (v !== false && v != null) el.setAttribute(k, v);
    });
    kids.flat().forEach(c => { if (c != null) el.append(c.nodeType ? c : document.createTextNode(c)); });
    return el;
  };

  // ---------- state ----------
  const defaults = () => ({
    trip: { country: '', month: new Date().getMonth() + 1, days: 7, gender: 'women', age: 'adult', fbBand: 2, fbRain: false },
    items: [], hidePacked: false
  });
  let state = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.trip && Array.isArray(saved.items)) {
      state = Object.assign(defaults(), saved);
      state.trip = Object.assign(defaults().trip, saved.trip);
    }
  } catch (e) { /* ignore corrupt storage */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full/blocked */ } };
  const uid = () => Math.random().toString(36).slice(2, 10);
  const norm = s => s.trim().toLowerCase();

  // ---------- trip form ----------
  const countries = Object.keys(DESTINATIONS).sort();
  $('countries').append(...countries.map(c => h('option', { value: c })));
  $('month').append(...MONTHS.map((m, n) => h('option', { value: n + 1 }, m)));
  $('fbBand').append(...BAND_NAMES.map((n, v) => h('option', { value: v }, n)));
  $('newCat').append(...LIST_CATS.map(c => h('option', { value: c }, c)));
  $('newCat').value = 'Toiletries';

  function matchCountry(text) {
    return countries.find(c => norm(c) === norm(text)) || null;
  }

  function readTrip() {
    const t = state.trip;
    t.country = $('country').value;
    t.month = Number($('month').value);
    t.days = Math.min(90, Math.max(1, Math.round(Number($('days').value)) || 7));
    t.gender = $('gender').value;
    t.age = $('age').value;
    t.fbBand = Number($('fbBand').value);
    t.fbRain = $('fbRain').checked;
  }
  function writeTrip() {
    const t = state.trip;
    $('country').value = t.country; $('month').value = t.month; $('days').value = t.days; $('gender').value = t.gender;
    $('age').value = t.age; $('fbBand').value = t.fbBand; $('fbRain').checked = t.fbRain;
    $('hidePacked').checked = state.hidePacked;
  }
  $('trip').addEventListener('input', () => { readTrip(); save(); renderSuggestions(); });
  $('trip').addEventListener('submit', e => e.preventDefault());

  // ---------- suggestions ----------
  const isAdded = name => state.items.some(x => norm(x.name) === norm(name));

  function addItem(name, category, qty, source) {
    if (!name.trim()) return;
    if (isAdded(name)) return;
    state.items.push({ id: uid(), name: name.trim(), category, qty: Math.max(1, qty | 0 || 1), packed: false, source });
  }

  function renderSuggestions() {
    const box = $('suggestions');
    box.replaceChildren(h('h2', null, '2. What locals wear'));
    const t = state.trip;
    const text = t.country.trim();
    if (!text) { box.append(h('p', { class: 'muted' }, 'Enter a destination to see suggestions.')); $('fallback').hidden = true; return; }

    const country = matchCountry(text);
    $('fallback').hidden = !!country;
    const res = getSuggestions({ country: country || text, month: t.month, days: t.days, gender: t.gender, ageGroup: t.age, fallbackBand: t.fbBand, fallbackRain: t.fbRain });
    const m = res.meta;

    box.append(h('div', { class: 'summary' },
      h('strong', null, `${country || text} in ${MONTHS[t.month - 1]}: ${m.bandName}${m.rain ? ', rain likely' : ''}`),
      h('span', null, `${m.days}-day trip.${m.laundry ? ' Quantities assume you can do laundry once.' : ''} `),
      m.region ? h('span', null, `Climate shown for ${m.region}.`) : null));

    if (!m.known) {
      box.append(h('div', { class: 'notice' }, 'Not locally tuned yet: these are weather-based basics. Look at what locals wear on arrival and adjust.'));
    } else {
      box.append(h('div', { class: 'style-box' },
        h('p', null, h('strong', null, 'How locals dress: '), m.vibe),
        h('p', null, h('strong', null, 'Typical colours: '), m.palette),
        h('p', null, h('strong', null, 'Locals rarely wear: '), m.avoid)));
    }

    const addAll = items => h('button', { type: 'button', class: 'btn small', onclick: () => { items.forEach(x => addItem(x.item, x.cat, x.qty, 'suggested')); save(); render(); } }, 'Add all');
    box.append(h('div', { class: 'cat-head' }, h('h3', null, 'Suggested items'), addAll(res.items)));

    CATS.forEach(cat => {
      const items = res.items.filter(x => x.cat === cat);
      if (!items.length) return;
      box.append(h('div', { class: 'cat-head' }, h('h3', null, cat), addAll(items)));
      items.forEach(x => {
        const added = isAdded(x.item);
        box.append(h('div', { class: 'sug' },
          h('div', { class: 'txt' },
            h('div', { class: 'name' }, `${x.item}${x.qty > 1 ? ' × ' + x.qty : ''}`, x.local ? h('span', { class: 'badge' }, 'local style') : null),
            h('div', { class: 'why' }, x.why)),
          h('button', {
            type: 'button', class: 'btn small' + (added ? ' added' : ''), disabled: added,
            onclick: () => { addItem(x.item, x.cat, x.qty, 'suggested'); save(); render(); }
          }, added ? 'Added ✓' : '+ Add')));
      });
    });
  }

  // ---------- packing list ----------
  function renderList() {
    const list = $('list');
    list.replaceChildren();
    const total = state.items.length;
    const done = state.items.filter(x => x.packed).length;
    $('barFill').style.width = total ? (done / total * 100) + '%' : '0';
    $('progress').setAttribute('aria-valuenow', total ? Math.round(done / total * 100) : 0);
    $('progressText').textContent = total ? `${done} / ${total} packed${done === total ? ' 🎉 all done!' : ''}` : '0 / 0 packed';

    if (!total) { list.append(h('p', { class: 'empty' }, 'Your list is empty. Add suggestions or your own items.')); return; }

    const visible = x => !(state.hidePacked && x.packed);
    const cats = LIST_CATS.concat([...new Set(state.items.map(x => x.category))].filter(c => !LIST_CATS.includes(c)));
    cats.forEach(cat => {
      const items = state.items.filter(x => x.category === cat && visible(x));
      if (!items.length) return;
      const all = state.items.filter(x => x.category === cat);
      const g = h('div', { class: 'group' }, h('h3', null, `${cat} (${all.filter(x => x.packed).length}/${all.length})`));
      items.forEach(x => g.append(h('div', { class: 'item' + (x.packed ? ' packed' : '') },
        h('input', { type: 'checkbox', checked: x.packed, 'aria-label': `Packed: ${x.name}`, onchange: e => { x.packed = e.target.checked; save(); renderList(); } }),
        h('span', { class: 'name' }, x.name),
        h('input', { class: 'qty', type: 'number', min: 1, value: x.qty, 'aria-label': `Quantity of ${x.name}`, onchange: e => { x.qty = Math.max(1, Number(e.target.value) | 0 || 1); e.target.value = x.qty; save(); } }),
        h('button', { type: 'button', class: 'icon', title: 'Rename', 'aria-label': `Rename ${x.name}`, onclick: () => { const n = prompt('Rename item', x.name); if (n && n.trim()) { x.name = n.trim(); save(); render(); } } }, '✎'),
        h('button', { type: 'button', class: 'icon', title: 'Remove', 'aria-label': `Remove ${x.name}`, onclick: () => { state.items = state.items.filter(i => i.id !== x.id); save(); render(); } }, '✕'))));
      list.append(g);
    });
    if (!list.children.length) list.append(h('p', { class: 'empty' }, 'Everything is packed! 🎉'));
  }

  function renderChips() {
    const chips = $('chips');
    chips.replaceChildren(...QUICK.filter(([n]) => !isAdded(n)).map(([n, c]) =>
      h('button', { type: 'button', class: 'chip', onclick: () => { addItem(n, c, 1, 'custom'); save(); render(); } }, '+ ' + n)));
  }

  function render() { renderSuggestions(); renderList(); renderChips(); }

  // ---------- list controls ----------
  $('addForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('newName').value;
    if (isAdded(name)) { alert('That item is already on your list.'); return; }
    addItem(name, $('newCat').value, Number($('newQty').value), 'custom');
    $('newName').value = ''; $('newQty').value = 1; $('newName').focus();
    save(); render();
  });
  $('hidePacked').addEventListener('change', e => { state.hidePacked = e.target.checked; save(); renderList(); });
  $('untick').addEventListener('click', () => { state.items.forEach(x => { x.packed = false; }); save(); renderList(); });
  $('clear').addEventListener('click', () => {
    if (state.items.length && confirm('Remove every item from your packing list?')) { state.items = []; save(); render(); }
  });
  $('print').addEventListener('click', () => window.print());

  writeTrip();
  render();
})();
