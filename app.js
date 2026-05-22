// Flipper One Pinout — interactive logic.

const grid = document.getElementById("header-grid");
const detailsBox = document.getElementById("details");
const filterBar = document.getElementById("filter-bar");

let activeFilter = "all";
let selectedKey = null;

// Build a flat list of all pins with row index, so we can address them by id.
function allPins() {
  const out = [];
  HEADER_ROWS.forEach((row, i) => {
    out.push({ ...row.left,  row: i, side: "left"  });
    out.push({ ...row.right, row: i, side: "right" });
  });
  return out;
}

const PIN_LIST = allPins();
const PIN_BY_KEY = Object.fromEntries(PIN_LIST.map(p => [`${p.row}-${p.side}`, p]));

// ---------- header grid ----------

function pinKey(row, side) { return `${row}-${side}`; }

function descCellHTML(p) {
  const altLines = p.alts.map(a => {
    const muxBit = a.mux ? ` <span class="alt-line">(${a.mux})</span>` : "";
    return `<span class="alt-line">${a.signal}${muxBit}</span>`;
  }).join("");
  return `<strong>${p.name}</strong>${altLines}`;
}

function renderHeaderGrid() {
  grid.innerHTML = "";

  HEADER_ROWS.forEach((row, i) => {
    const leftKey  = pinKey(i, "left");
    const rightKey = pinKey(i, "right");

    const descL = document.createElement("div");
    descL.className = "desc left";
    descL.dataset.key = leftKey;
    descL.innerHTML = descCellHTML(row.left);

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
    descR.innerHTML = descCellHTML(row.right);

    grid.append(descL, pinL, pinR, descR);
  });
}

// ---------- filter bar ----------

function renderFilters() {
  filterBar.innerHTML = "";
  FILTERS.forEach(f => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (f.id === activeFilter ? " active" : "");
    btn.dataset.id = f.id;
    btn.textContent = f.label;
    btn.addEventListener("click", () => setFilter(f.id));
    filterBar.appendChild(btn);
  });
}

function setFilter(id) {
  activeFilter = id;
  renderFilters();
  applyFilter();
}

function applyFilter() {
  const f = FILTERS.find(x => x.id === activeFilter) || FILTERS[0];
  PIN_LIST.forEach(p => {
    const key = pinKey(p.row, p.side);
    const matches = f.test(p);
    document.querySelectorAll(`[data-key="${key}"]`).forEach(el => {
      el.classList.toggle("dimmed", !matches);
    });
  });
}

// ---------- details panel ----------

function selectPin(key) {
  if (selectedKey === key) {
    // Toggle off if clicking the same pin again.
    selectedKey = null;
    renderDetails(null);
  } else {
    selectedKey = key;
    renderDetails(PIN_BY_KEY[key]);
  }
  document.querySelectorAll(".pin").forEach(el => {
    el.classList.toggle("selected", el.dataset.key === selectedKey);
  });
}

function renderDetails(p) {
  if (!p) {
    detailsBox.innerHTML = `<p class="placeholder">Select a pin to view its functions.</p>`;
    return;
  }

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

// ---------- boot ----------

renderHeaderGrid();
renderFilters();
applyFilter();
