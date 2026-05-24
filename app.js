// Flipper One Pinout — interactive logic.
//
// Two pinouts share the same UI shell: a tab switcher at the top, a search box,
// a filter chip bar, the connector itself, and a sticky details panel.
//
// GPIO header uses an inline vertical grid (descriptions next to each pin).
// M.2 port uses a horizontal two-row layout (pin numbers only; click to see the
// description in the details panel).
//
// URL hash mirrors the visible state and is deep-linkable:
//   #gpio          → GPIO tab, no selection
//   #gpio/B4       → GPIO tab + pin B4 selected
//   #m2            → M.2 tab, no selection
//   #m2/42         → M.2 tab + pin 42 selected

const grid       = document.getElementById("header-grid");
const m2RowOdd   = document.getElementById("m2-row-odd");
const m2RowEven  = document.getElementById("m2-row-even");
const detailsBox = document.getElementById("details");
const filterBar  = document.getElementById("filter-bar");
const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
const tabs       = document.querySelectorAll(".tabs .tab");
const wraps      = document.querySelectorAll(".conn-wrap");

let currentPinout = "gpio";                           // "gpio" | "m2"
let activeFilter  = { gpio: "all", m2: "all" };
let selectedKey   = { gpio: null, m2: null };         // per-pinout
let searchQuery   = "";                                // shared across pinouts
let suppressHashWrite = false;                         // re-entry guard for hash ↔ state

// ---------- GPIO header layout ----------

function gpioPinList() {
  const out = [];
  HEADER_ROWS.forEach((row, i) => {
    out.push({ ...row.left,  row: i, side: "left",  _key: `g-${i}-l` });
    out.push({ ...row.right, row: i, side: "right", _key: `g-${i}-r` });
  });
  return out;
}

const GPIO_PIN_LIST   = gpioPinList();
const GPIO_PIN_BY_KEY = Object.fromEntries(GPIO_PIN_LIST.map(p => [p._key, p]));

function gpioDescCellHTML(p) {
  const altLines = p.alts.map(a => {
    const muxBit = a.mux ? ` <span class="alt-line">(${a.mux})</span>` : "";
    return `<span class="alt-line">${a.signal}${muxBit}</span>`;
  }).join("");
  return `<strong>${p.name}</strong>${altLines}`;
}

function renderGPIOGrid() {
  grid.innerHTML = "";
  HEADER_ROWS.forEach((row, i) => {
    const leftKey  = `g-${i}-l`;
    const rightKey = `g-${i}-r`;

    const descL = document.createElement("div");
    descL.className = "desc left";
    descL.dataset.key = leftKey;
    descL.innerHTML = gpioDescCellHTML(row.left);

    const pinL = document.createElement("button");
    pinL.type = "button";
    pinL.className = "pin";
    pinL.dataset.key  = leftKey;
    pinL.dataset.type = row.left.type;
    pinL.textContent  = row.left.label;
    pinL.setAttribute("aria-label", `${row.left.label} — ${row.left.name}`);
    pinL.addEventListener("click", () => selectPin(leftKey));

    const pinR = document.createElement("button");
    pinR.type = "button";
    pinR.className = "pin";
    pinR.dataset.key  = rightKey;
    pinR.dataset.type = row.right.type;
    pinR.textContent  = row.right.label;
    pinR.setAttribute("aria-label", `${row.right.label} — ${row.right.name}`);
    pinR.addEventListener("click", () => selectPin(rightKey));

    const descR = document.createElement("div");
    descR.className = "desc right";
    descR.dataset.key = rightKey;
    descR.innerHTML = gpioDescCellHTML(row.right);

    grid.append(descL, pinL, pinR, descR);
  });
}

// ---------- M.2 layout ----------

const M2_PIN_BY_KEY = Object.fromEntries(M2_PINS.map(p => [`m-${p.pin}`, p]));

function renderM2Rows() {
  m2RowOdd.innerHTML  = "";
  m2RowEven.innerHTML = "";

  // We render every pin position 1..75 so the missing 12–19 stretch shows up
  // as a visible gap (the "key notch").
  for (let n = 1; n <= 75; n++) {
    const isOdd = (n % 2) === 1;
    const target = isOdd ? m2RowOdd : m2RowEven;

    const pinData = M2_PINS.find(p => p.pin === n);
    const cell = document.createElement(pinData ? "button" : "div");
    if (pinData) {
      cell.type = "button";
      cell.className = "m2-pin";
      cell.dataset.key  = `m-${n}`;
      cell.dataset.type = pinData.type;
      cell.setAttribute("aria-label", `Pin ${n} — ${pinData.desc}`);
      cell.addEventListener("click", () => selectPin(`m-${n}`));
    } else {
      cell.className = "m2-pin m2-gap";
      cell.setAttribute("aria-hidden", "true");
    }
    cell.textContent = n;
    target.appendChild(cell);
  }
}

// ---------- tab switching ----------

function setPinout(name, { skipHashWrite = false } = {}) {
  currentPinout = name;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.target === name));
  wraps.forEach(w => { w.hidden = w.dataset.pinout !== name; });
  renderFilters();
  applyFilterAndSearch();
  // Restore selection display for whichever pinout we're now showing.
  const sel = selectedKey[name];
  highlightSelection(sel);
  renderDetails(sel ? pinFor(sel) : null);
  if (!skipHashWrite) writeHash();
}

tabs.forEach(t => t.addEventListener("click", () => setPinout(t.dataset.target)));

// ---------- filters ----------

function currentFilters() {
  return currentPinout === "gpio" ? GPIO_FILTERS : M2_FILTERS;
}

function renderFilters() {
  filterBar.innerHTML = "";
  currentFilters().forEach(f => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (f.id === activeFilter[currentPinout] ? " active" : "");
    btn.dataset.id = f.id;
    btn.textContent = f.label;
    btn.addEventListener("click", () => setFilter(f.id));
    filterBar.appendChild(btn);
  });
}

function setFilter(id) {
  activeFilter[currentPinout] = id;
  renderFilters();
  applyFilterAndSearch();
}

// ---------- search ----------

function pinMatchesSearch(p) {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return true;
  if (currentPinout === "gpio") {
    if ((p.label || "").toLowerCase().includes(q)) return true;
    if ((p.name  || "").toLowerCase().includes(q)) return true;
    if ((p.notes || "").toLowerCase().includes(q)) return true;
    if (p.alts && p.alts.some(a => a.signal.toLowerCase().includes(q))) return true;
    return false;
  } else {
    if (String(p.pin).includes(q)) return true;
    if ((p.desc || "").toLowerCase().includes(q)) return true;
    if ((p.type || "").toLowerCase().includes(q)) return true;
    return false;
  }
}

function applyFilterAndSearch() {
  const f = currentFilters().find(x => x.id === activeFilter[currentPinout]) || currentFilters()[0];

  let visible = 0, total = 0;
  if (currentPinout === "gpio") {
    GPIO_PIN_LIST.forEach(p => {
      const matches = f.test(p) && pinMatchesSearch(p);
      total += 1;
      if (matches) visible += 1;
      document.querySelectorAll(`[data-key="${p._key}"]`).forEach(el => {
        el.classList.toggle("dimmed", !matches);
      });
    });
  } else {
    M2_PINS.forEach(p => {
      const matches = f.test(p) && pinMatchesSearch(p);
      total += 1;
      if (matches) visible += 1;
      document.querySelectorAll(`[data-key="m-${p.pin}"]`).forEach(el => {
        el.classList.toggle("dimmed", !matches);
      });
    });
  }

  // Show count only when actively searching or filtering — silence when neither is active.
  const filteringActive = activeFilter[currentPinout] !== "all" || searchQuery.trim();
  if (filteringActive) {
    searchCount.textContent = `${visible} of ${total} pins`;
  } else {
    searchCount.textContent = "";
  }
}

let searchDebounce = null;
searchInput.addEventListener("input", e => {
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = e.target.value;
    applyFilterAndSearch();
  }, 50);
});

// ---------- selection / details ----------

function pinFor(key) {
  return GPIO_PIN_BY_KEY[key] || M2_PIN_BY_KEY[key] || null;
}

function selectPin(key, { skipHashWrite = false } = {}) {
  if (selectedKey[currentPinout] === key) {
    selectedKey[currentPinout] = null;
    highlightSelection(null);
    renderDetails(null);
  } else {
    selectedKey[currentPinout] = key;
    highlightSelection(key);
    renderDetails(pinFor(key));
  }
  if (!skipHashWrite) writeHash();
}

function highlightSelection(key) {
  document.querySelectorAll(".pin, .m2-pin").forEach(el => {
    el.classList.toggle("selected", el.dataset.key === key);
  });
}

function renderGPIODetails(p) {
  let altsHTML;
  if (p.alts.length === 0) {
    altsHTML = `<p class="alt-empty">No alternate functions — dedicated ${p.type === "gnd" ? "ground" : p.type === "power" ? "power rail" : "function"}.</p>`;
  } else {
    altsHTML = `<ul class="alt-list">`
      + p.alts.map(a => {
          const mux = a.mux ? `<span class="mux">${a.mux}</span>` : "";
          return `<li><span>${a.signal}</span>${mux}</li>`;
        }).join("")
      + `</ul>`;
  }
  detailsBox.innerHTML = `
    <h2>${p.label}</h2>
    <p class="name">${p.name}</p>
    ${p.notes ? `<p class="notes">${p.notes}</p>` : ""}
    ${altsHTML}
  `;
}

function renderM2Details(p) {
  detailsBox.innerHTML = `
    <h2>Pin ${p.pin}</h2>
    <p class="name m2-name">${p.desc}</p>
    <p class="notes m2-type-note">Type: <strong>${p.type}</strong></p>
  `;
}

function renderDetails(p) {
  if (!p) {
    detailsBox.innerHTML = `<p class="placeholder">Select a pin to view its functions.</p>`;
    return;
  }
  if (currentPinout === "gpio") renderGPIODetails(p);
  else renderM2Details(p);
}

// ---------- URL hash sync ----------

function hashFromState() {
  const sel = selectedKey[currentPinout];
  if (currentPinout === "gpio") {
    if (sel && GPIO_PIN_BY_KEY[sel]) {
      return `#gpio/${encodeURIComponent(GPIO_PIN_BY_KEY[sel].label)}`;
    }
    return "#gpio";
  }
  if (sel && M2_PIN_BY_KEY[sel]) {
    return `#m2/${M2_PIN_BY_KEY[sel].pin}`;
  }
  return "#m2";
}

function writeHash() {
  if (suppressHashWrite) return;
  const next = hashFromState();
  if (window.location.hash !== next) {
    history.replaceState(null, "", next);
  }
}

function applyHash() {
  const raw = (window.location.hash || "").slice(1);  // strip '#'
  if (!raw) return;
  const [tab, target] = raw.split("/", 2);
  if (tab !== "gpio" && tab !== "m2") return;

  suppressHashWrite = true;
  setPinout(tab, { skipHashWrite: true });

  if (target) {
    if (tab === "gpio") {
      const label = decodeURIComponent(target);
      const pin = GPIO_PIN_LIST.find(p => p.label === label);
      if (pin) selectPin(pin._key, { skipHashWrite: true });
    } else {
      const n = parseInt(target, 10);
      if (n && M2_PIN_BY_KEY[`m-${n}`]) selectPin(`m-${n}`, { skipHashWrite: true });
    }
  }
  suppressHashWrite = false;
}

window.addEventListener("hashchange", applyHash);

// ---------- boot ----------

renderGPIOGrid();
renderM2Rows();
setPinout("gpio", { skipHashWrite: true });
applyHash();   // restore deep-linked state on first load
