/* ═══════════════════════════════════════════════
   ir-pt edtech — College & Course Comparator
   script.js — Full Application Logic
   ═══════════════════════════════════════════════ */

'use strict';

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const STORAGE_KEY   = 'irpt_edtech_data';
const SESSION_KEY   = 'irpt_admin_session';
const ADMIN_USER    = 'ir-ptedtech';
const ADMIN_PASS    = '1207';

// ─── SAMPLE DATA ────────────────────────────────────────────────────────────
const SEED_DATA = [
  { id: 1, college: "AIIMS Bhopal",              city: "Bhopal",  course: "MBBS",           fee: 6000,    duration: "5.5 Years", type: "Government" },
  { id: 2, college: "Gandhi Medical College",    city: "Bhopal",  course: "MBBS",           fee: 22000,   duration: "5.5 Years", type: "Government" },
  { id: 3, college: "Index Medical College",     city: "Indore",  course: "MBBS",           fee: 1400000, duration: "5.5 Years", type: "Private"     },
  { id: 4, college: "People's Medical College",  city: "Bhopal",  course: "MBBS",           fee: 1250000, duration: "5.5 Years", type: "Private"     },
  { id: 5, college: "Barkatullah University",    city: "Bhopal",  course: "B Pharma",       fee: 38000,   duration: "4 Years",   type: "Government" },
  { id: 6, college: "RKDF University",           city: "Bhopal",  course: "B Pharma",       fee: 95000,   duration: "4 Years",   type: "Private"     },
  { id: 7, college: "Oriental College",          city: "Bhopal",  course: "B Pharma",       fee: 88000,   duration: "4 Years",   type: "Private"     },
  { id: 8, college: "Govt. Holkar College",      city: "Indore",  course: "B Pharma",       fee: 28000,   duration: "4 Years",   type: "Government" },
  { id: 9, college: "Medicaps University",       city: "Indore",  course: "B Pharma",       fee: 93000,   duration: "4 Years",   type: "Private"     },
  { id: 10, college: "IIT Indore",               city: "Indore",  course: "B Tech",         fee: 220000,  duration: "4 Years",   type: "Government" },
  { id: 11, college: "NIT Bhopal",               city: "Bhopal",  course: "B Tech",         fee: 145000,  duration: "4 Years",   type: "Government" },
  { id: 12, college: "RKDF University",          city: "Bhopal",  course: "B Tech",         fee: 105000,  duration: "4 Years",   type: "Private"     },
  { id: 13, college: "Medicaps University",      city: "Indore",  course: "B Tech",         fee: 118000,  duration: "4 Years",   type: "Private"     },
  { id: 14, college: "LNCT Group",               city: "Bhopal",  course: "B Tech",         fee: 95000,   duration: "4 Years",   type: "Private"     },
  { id: 15, college: "IIM Indore",               city: "Indore",  course: "MBA",            fee: 2300000, duration: "2 Years",   type: "Government" },
  { id: 16, college: "Barkatullah University",   city: "Bhopal",  course: "MBA",            fee: 32000,   duration: "2 Years",   type: "Government" },
  { id: 17, college: "RKDF University",          city: "Bhopal",  course: "MBA",            fee: 72000,   duration: "2 Years",   type: "Private"     },
  { id: 18, college: "Sage University",          city: "Indore",  course: "MBA",            fee: 95000,   duration: "2 Years",   type: "Private"     },
  { id: 19, college: "Barkatullah University",   city: "Bhopal",  course: "BBA",            fee: 18000,   duration: "3 Years",   type: "Government" },
  { id: 20, college: "RKDF University",          city: "Bhopal",  course: "BBA",            fee: 48000,   duration: "3 Years",   type: "Private"     },
  { id: 21, college: "Medicaps University",      city: "Indore",  course: "BBA",            fee: 52000,   duration: "3 Years",   type: "Private"     },
  { id: 22, college: "IPS Academy",              city: "Indore",  course: "BBA",            fee: 50000,   duration: "3 Years",   type: "Private"     },
  { id: 23, college: "AIIMS Bhopal",             city: "Bhopal",  course: "BSc Nursing",    fee: 10000,   duration: "4 Years",   type: "Government" },
  { id: 24, college: "People's Medical College", city: "Bhopal",  course: "BSc Nursing",    fee: 185000,  duration: "4 Years",   type: "Private"     },
  { id: 25, college: "Index Medical College",    city: "Indore",  course: "BSc Nursing",    fee: 175000,  duration: "4 Years",   type: "Private"     },
  { id: 26, college: "RKDF University",          city: "Bhopal",  course: "BSc Nursing",    fee: 120000,  duration: "4 Years",   type: "Private"     },
  { id: 27, college: "Barkatullah University",   city: "Bhopal",  course: "BCA",            fee: 18000,   duration: "3 Years",   type: "Government" },
  { id: 28, college: "Sage University",          city: "Indore",  course: "BCA",            fee: 62000,   duration: "3 Years",   type: "Private"     },
  { id: 29, college: "Medicaps University",      city: "Indore",  course: "BCA",            fee: 60000,   duration: "3 Years",   type: "Private"     },
  { id: 30, college: "LNCT Group",               city: "Bhopal",  course: "BCA",            fee: 50000,   duration: "3 Years",   type: "Private"     },
  { id: 31, college: "NIT Bhopal",               city: "Bhopal",  course: "MCA",            fee: 95000,   duration: "2 Years",   type: "Government" },
  { id: 32, college: "RKDF University",          city: "Bhopal",  course: "MCA",            fee: 65000,   duration: "2 Years",   type: "Private"     },
  { id: 33, college: "Barkatullah University",   city: "Bhopal",  course: "B Com",          fee: 12000,   duration: "3 Years",   type: "Government" },
  { id: 34, college: "RKDF University",          city: "Bhopal",  course: "B Com",          fee: 35000,   duration: "3 Years",   type: "Private"     },
  { id: 35, college: "Medicaps University",      city: "Indore",  course: "B Com",          fee: 42000,   duration: "3 Years",   type: "Private"     },
  { id: 36, college: "Barkatullah University",   city: "Bhopal",  course: "LLB",            fee: 25000,   duration: "3 Years",   type: "Government" },
  { id: 37, college: "RKDF University",          city: "Bhopal",  course: "LLB",            fee: 55000,   duration: "3 Years",   type: "Private"     },
  { id: 38, college: "IPS Academy",              city: "Indore",  course: "LLB",            fee: 58000,   duration: "3 Years",   type: "Private"     },
  { id: 39, college: "Oriental College",         city: "Bhopal",  course: "D Pharma",       fee: 55000,   duration: "2 Years",   type: "Private"     },
  { id: 40, college: "Barkatullah University",   city: "Bhopal",  course: "D Pharma",       fee: 22000,   duration: "2 Years",   type: "Government" },
];

// ─── STATE ──────────────────────────────────────────────────────────────────
let data         = [];
let filtered     = [];
let currentSort  = 'none';   // 'none' | 'asc' | 'desc'
let columnSortState = { col: null, dir: 'asc' };
let currentView  = 'table';  // 'table' | 'card'
let nextId       = 100;

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  buildDropdowns();
  applyFilters();
  updateStats();
  if (sessionActive()) openDashboard();
});

// ─── DATA PERSISTENCE ────────────────────────────────────────────────────────
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { data = JSON.parse(saved); } catch { data = [...SEED_DATA]; }
  } else {
    data = [...SEED_DATA];
    saveData();
  }
  nextId = data.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function updateStats() {
  const colleges = new Set(data.map(d => d.college)).size;
  const courses  = new Set(data.map(d => d.course)).size;
  animateCount('statColleges', colleges);
  animateCount('statCourses',  courses);
  animateCount('statEntries',  data.length);
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step  = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}

// ─── DROPDOWNS ───────────────────────────────────────────────────────────────
function buildDropdowns() {
  const colleges = [...new Set(data.map(d => d.college))].sort();
  const courses  = [...new Set(data.map(d => d.course))].sort();

  const cSel = document.getElementById('filterCollege');
  const keepC = cSel.value;
  cSel.innerHTML = '<option value="">All Colleges</option>';
  colleges.forEach(c => {
    const o = new Option(c, c);
    if (c === keepC) o.selected = true;
    cSel.appendChild(o);
  });

  const crSel = document.getElementById('filterCourse');
  const keepCr = crSel.value;
  crSel.innerHTML = '<option value="">All Courses</option>';
  courses.forEach(c => {
    const o = new Option(c, c);
    if (c === keepCr) o.selected = true;
    crSel.appendChild(o);
  });

  // Datalist for admin form
  const dl = document.getElementById('courseList');
  if (dl) {
    dl.innerHTML = '';
    courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; dl.appendChild(opt);
    });
  }
}

// ─── FILTERS & RENDER ────────────────────────────────────────────────────────
function applyFilters() {
  const search    = document.getElementById('searchInput').value.trim().toLowerCase();
  const colFilter = document.getElementById('filterCollege').value;
  const crFilter  = document.getElementById('filterCourse').value;

  // show/hide clear button
  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn) clearBtn.classList.toggle('visible', search.length > 0);

  filtered = data.filter(row => {
    const matchSearch = !search ||
      row.college.toLowerCase().includes(search) ||
      row.course.toLowerCase().includes(search) ||
      (row.city && row.city.toLowerCase().includes(search));
    const matchCollege = !colFilter || row.college === colFilter;
    const matchCourse  = !crFilter  || row.course  === crFilter;
    return matchSearch && matchCollege && matchCourse;
  });

  // Fee sort
  if (currentSort === 'asc')  filtered.sort((a, b) => a.fee - b.fee);
  if (currentSort === 'desc') filtered.sort((a, b) => b.fee - a.fee);

  // Column sort
  if (columnSortState.col) {
    const { col, dir } = columnSortState;
    filtered.sort((a, b) => {
      let va = a[col], vb = b[col];
      if (col === 'fee') return dir === 'asc' ? va - vb : vb - va;
      return dir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }

  document.getElementById('dataCount').textContent = filtered.length;
  renderMainTable();
  renderCards();
  autoCompare(crFilter);
}

function clearSearchInput() {
  document.getElementById('searchInput').value = '';
  applyFilters();
}

function resetFilters() {
  document.getElementById('searchInput').value  = '';
  document.getElementById('filterCollege').value = '';
  document.getElementById('filterCourse').value  = '';
  currentSort = 'none';
  columnSortState = { col: null, dir: 'asc' };
  updateSortBtns();
  updateArrows();
  closeCompare();
  applyFilters();
}

// ─── SORT ─────────────────────────────────────────────────────────────────────
function setSort(type) {
  currentSort = type;
  columnSortState = { col: null, dir: 'asc' };
  updateSortBtns();
  updateArrows();
  applyFilters();
}

function updateSortBtns() {
  ['sortAsc','sortDesc','sortNone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const active = { asc: 'sortAsc', desc: 'sortDesc', none: 'sortNone' }[currentSort];
  if (active) document.getElementById(active).classList.add('active');
}

function columnSort(col) {
  if (columnSortState.col === col) {
    columnSortState.dir = columnSortState.dir === 'asc' ? 'desc' : 'asc';
  } else {
    columnSortState = { col, dir: 'asc' };
  }
  currentSort = 'none';
  updateSortBtns();
  updateArrows();
  applyFilters();
}

function updateArrows() {
  ['college','course','fee'].forEach(col => {
    const el = document.getElementById('arr-' + col);
    if (!el) return;
    if (columnSortState.col === col) {
      el.textContent = columnSortState.dir === 'asc' ? '▲' : '▼';
    } else {
      el.textContent = '';
    }
  });
}

// ─── FORMAT ──────────────────────────────────────────────────────────────────
function formatFee(fee) {
  if (fee >= 100000) return '₹' + (fee / 100000).toFixed(fee % 100000 === 0 ? 0 : 2).replace(/\.?0+$/, '') + 'L';
  if (fee >= 1000)   return '₹' + (fee / 1000).toFixed(fee % 1000 === 0 ? 0 : 1).replace(/\.?0+$/, '') + 'K';
  return '₹' + fee.toLocaleString('en-IN');
}

function typeClass(type) {
  if (type === 'Government') return 'type-govt';
  if (type === 'Deemed')     return 'type-deemed';
  return 'type-private';
}

// ─── MAIN TABLE ──────────────────────────────────────────────────────────────
function renderMainTable() {
  const tbody = document.getElementById('mainTableBody');
  const noRes = document.getElementById('noResults');
  const tView = document.getElementById('tableView');

  if (!filtered.length) {
    noRes.style.display = 'block';
    tView.style.display = 'none';
    return;
  }
  noRes.style.display = 'none';
  tView.style.display = currentView === 'table' ? 'block' : 'none';

  tbody.innerHTML = '';
  filtered.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.style.animationDelay = `${i * 0.018}s`;
    tr.innerHTML = `
      <td style="color:var(--muted);font-size:0.8rem;font-weight:600;">${i + 1}</td>
      <td>
        <div class="college-cell">
          <div class="name">${esc(row.college)}</div>
          <div class="meta">${row.city ? '📍 ' + esc(row.city) : ''}${row.type ? ' · <span class="type-badge ' + typeClass(row.type) + '">' + esc(row.type) + '</span>' : ''}</div>
        </div>
      </td>
      <td><span class="course-pill">${esc(row.course)}</span></td>
      <td>
        <div class="fee-cell">
          <div class="amount">${formatFee(row.fee)}</div>
          <div class="per-year">per year${row.duration ? ' · ' + esc(row.duration) : ''}</div>
        </div>
      </td>
      <td>
        <button class="btn-compare-row" onclick="triggerCompare('${esc(row.course)}')">
          ⚖ Compare
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ─── CARD VIEW ───────────────────────────────────────────────────────────────
function renderCards() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  filtered.forEach((row, i) => {
    const div = document.createElement('div');
    div.className = 'college-card';
    div.style.animationDelay = `${i * 0.03}s`;
    div.innerHTML = `
      <div class="card-top">
        <div>
          <div class="card-college">${esc(row.college)}</div>
          <div class="card-city">${row.city ? '📍 ' + esc(row.city) : ''}</div>
        </div>
        <div>
          <div class="card-fee">${formatFee(row.fee)}<small>per year</small></div>
        </div>
      </div>
      <hr class="card-divider" />
      <div class="card-meta">
        <span class="course-pill">${esc(row.course)}</span>
        ${row.type ? '<span class="type-badge ' + typeClass(row.type) + '">' + esc(row.type) + '</span>' : ''}
        ${row.duration ? '<span style="font-size:0.72rem;color:var(--muted)">⏱ ' + esc(row.duration) + '</span>' : ''}
      </div>
      <button class="card-btn" onclick="triggerCompare('${esc(row.course)}')">⚖ Compare with other colleges</button>
    `;
    grid.appendChild(div);
  });
}

function setView(v) {
  currentView = v;
  document.getElementById('tableView').style.display = v === 'table' ? 'block' : 'none';
  document.getElementById('cardView').style.display  = v === 'card'  ? 'block' : 'none';
  document.getElementById('vtTable').classList.toggle('active', v === 'table');
  document.getElementById('vtCard').classList.toggle('active',  v === 'card');
  renderMainTable();
  renderCards();
}

// ─── COMPARISON ──────────────────────────────────────────────────────────────
function autoCompare(course) {
  if (course) {
    showCompare(course);
  } else {
    closeCompare();
  }
}

function triggerCompare(course) {
  document.getElementById('filterCourse').value = course;
  showCompare(course);
  applyFilters();
  document.getElementById('comparePanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showCompare(course) {
  const matches = data.filter(d => d.course === course).sort((a, b) => a.fee - b.fee);
  if (matches.length < 2) { closeCompare(); return; }

  const panel = document.getElementById('comparePanel');
  const tbody = document.getElementById('compareTableBody');
  document.getElementById('compareCourseName').textContent = course;

  const minFee = matches[0].fee;
  const maxFee = matches[matches.length - 1].fee;

  tbody.innerHTML = '';
  matches.forEach((row, i) => {
    const isLowest  = row.fee === minFee;
    const isHighest = row.fee === maxFee && matches.length > 1;
    const diff      = row.fee - minFee;

    const rankEl = i < 3
      ? `<span class="rank-badge rank-${i+1}">${i+1}</span>`
      : `<span class="rank-badge rank-other">${i+1}</span>`;

    let diffEl, statusEl;
    if (isLowest) {
      diffEl   = `<span class="diff-badge diff-lowest">Lowest</span>`;
      statusEl = `<span class="tag-lowest">✓ Best Price</span>`;
    } else if (isHighest && !isLowest) {
      diffEl   = `<span class="diff-badge diff-highest">+${formatFee(diff)} more</span>`;
      statusEl = `<span class="tag-highest">↑ Most Expensive</span>`;
    } else {
      diffEl   = `<span class="diff-badge diff-mid">+${formatFee(diff)}</span>`;
      statusEl = `<span class="tag-mid">Mid Range</span>`;
    }

    const tr = document.createElement('tr');
    tr.className = isLowest ? 'row-lowest' : isHighest ? 'row-highest' : '';
    tr.innerHTML = `
      <td>${rankEl}</td>
      <td>
        <div class="college-cell">
          <div class="name">${esc(row.college)}</div>
          <div class="meta">${row.city ? '📍 ' + esc(row.city) : ''}</div>
        </div>
      </td>
      <td><span class="course-pill">${esc(row.course)}</span></td>
      <td>
        <div class="fee-cell">
          <div class="amount">${formatFee(row.fee)}</div>
          <div class="per-year">per year</div>
        </div>
      </td>
      <td>${diffEl}</td>
      <td>${statusEl}</td>
    `;
    tbody.appendChild(tr);
  });

  panel.style.display = 'block';
}

function closeCompare() {
  document.getElementById('comparePanel').style.display = 'none';
}

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────
function sessionActive() {
  return localStorage.getItem(SESSION_KEY) === '1';
}

function toggleAdminPanel() {
  const overlay = document.getElementById('adminOverlay');
  if (overlay.classList.contains('open')) {
    closeAdmin();
  } else {
    overlay.classList.add('open');
    if (sessionActive()) {
      openDashboard();
    } else {
      document.getElementById('adminLoginBox').style.display  = 'block';
      document.getElementById('adminDashboard').style.display = 'none';
      setTimeout(() => document.getElementById('loginUser').focus(), 100);
    }
  }
}

function closeAdmin() {
  document.getElementById('adminOverlay').classList.remove('open');
}

function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginError');

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem(SESSION_KEY, '1');
    err.textContent = '';
    openDashboard();
  } else {
    err.textContent = '✕ Invalid credentials. Please try again.';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginPass').focus();
    // shake
    const box = document.getElementById('adminLoginBox');
    box.style.animation = 'none';
    box.offsetHeight;
    box.style.animation = 'shake 0.4s ease';
  }
}

function doLogout() {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('adminLoginBox').style.display  = 'block';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

function openDashboard() {
  document.getElementById('adminLoginBox').style.display  = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  renderAdminTable();
  cancelEdit();
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}
  60%{transform:translateX(-5px)}
  80%{transform:translateX(5px)}
}`;
document.head.appendChild(shakeStyle);

// ─── ADMIN FORM ───────────────────────────────────────────────────────────────
function submitForm() {
  const college  = document.getElementById('formCollege').value.trim();
  const course   = document.getElementById('formCourse').value.trim();
  const fee      = parseFloat(document.getElementById('formFee').value);
  const duration = document.getElementById('formDuration').value.trim();
  const city     = document.getElementById('formCity').value.trim();
  const type     = document.getElementById('formType').value;
  const editId   = document.getElementById('editId').value;
  const msg      = document.getElementById('formMsg');

  if (!college || !course || isNaN(fee) || fee < 0) {
    showMsg(msg, 'error', '✕ Please fill College, Course, and a valid Fee.');
    return;
  }

  if (editId) {
    // EDIT
    const idx = data.findIndex(d => String(d.id) === String(editId));
    if (idx > -1) {
      data[idx] = { ...data[idx], college, course, fee, duration, city, type };
      saveData();
      showMsg(msg, 'success', '✓ Entry updated successfully!');
      cancelEdit();
    }
  } else {
    // ADD
    data.push({ id: nextId++, college, course, fee, duration, city, type });
    saveData();
    showMsg(msg, 'success', '✓ New entry added!');
    clearForm();
  }

  buildDropdowns();
  applyFilters();
  updateStats();
  renderAdminTable();
}

function clearForm() {
  ['formCollege','formCourse','formFee','formDuration','formCity'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('formType').value = 'Private';
  document.getElementById('editId').value = '';
}

function cancelEdit() {
  clearForm();
  document.getElementById('formTitle').textContent = '➕ Add New Entry';
  document.getElementById('formSubmitBtn').textContent = '➕ Add Entry';
  document.getElementById('cancelBtn').style.display = 'none';
  document.getElementById('formMsg').textContent = '';
}

function editEntry(id) {
  const row = data.find(d => d.id === id);
  if (!row) return;
  document.getElementById('editId').value       = id;
  document.getElementById('formCollege').value  = row.college;
  document.getElementById('formCourse').value   = row.course;
  document.getElementById('formFee').value      = row.fee;
  document.getElementById('formDuration').value = row.duration || '';
  document.getElementById('formCity').value     = row.city || '';
  document.getElementById('formType').value     = row.type || 'Private';
  document.getElementById('formTitle').textContent    = '✏ Edit Entry';
  document.getElementById('formSubmitBtn').textContent = '✔ Save Changes';
  document.getElementById('cancelBtn').style.display  = 'inline-flex';
  document.getElementById('formMsg').textContent = '';
  document.getElementById('formCollege').focus();
  document.querySelector('.admin-form-panel').scrollIntoView({ behavior: 'smooth' });
}

function deleteEntry(id) {
  const row = data.find(d => d.id === id);
  if (!row) return;
  if (!confirm(`Delete entry:\n"${row.college}" – ${row.course} (${formatFee(row.fee)})?`)) return;
  data = data.filter(d => d.id !== id);
  saveData();
  buildDropdowns();
  applyFilters();
  updateStats();
  renderAdminTable();
}

// ─── ADMIN TABLE ──────────────────────────────────────────────────────────────
function renderAdminTable() {
  const search = (document.getElementById('adminSearch')?.value || '').toLowerCase();
  const tbody  = document.getElementById('adminTableBody');
  const noRes  = document.getElementById('adminNoResults');

  const rows = data.filter(d =>
    !search ||
    d.college.toLowerCase().includes(search) ||
    d.course.toLowerCase().includes(search) ||
    (d.city && d.city.toLowerCase().includes(search))
  );

  document.getElementById('adminCount').textContent = rows.length;

  if (!rows.length) {
    tbody.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';
  tbody.innerHTML = '';

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:var(--muted);font-size:0.8rem">${i+1}</td>
      <td>
        <div class="name" style="font-weight:600">${esc(row.college)}</div>
      </td>
      <td><span class="course-pill">${esc(row.course)}</span></td>
      <td><strong style="color:var(--primary)">${formatFee(row.fee)}</strong></td>
      <td style="color:var(--muted);font-size:0.82rem">${row.city || '—'}</td>
      <td>${row.type ? '<span class="type-badge ' + typeClass(row.type) + '">' + esc(row.type) + '</span>' : '—'}</td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="editEntry(${row.id})">✏ Edit</button>
          <button class="btn-del" onclick="deleteEntry(${row.id})">🗑 Del</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ─── BULK UPLOAD ──────────────────────────────────────────────────────────────
function showBulkUpload() {
  document.getElementById('bulkPanel').style.display = 'block';
  document.getElementById('bulkJson').focus();
}
function hideBulkUpload() {
  document.getElementById('bulkPanel').style.display = 'none';
  document.getElementById('bulkJson').value = '';
  document.getElementById('bulkMsg').textContent = '';
}

function doBulkUpload() {
  const raw = document.getElementById('bulkJson').value.trim();
  const msg = document.getElementById('bulkMsg');
  let parsed;
  try {
    let clean = raw.replace(/```json|```/g, '').trim();
    parsed = JSON.parse(clean);
  } catch (e) {
    showMsg(msg, 'error', '✕ Invalid JSON. Check your format and try again.');
    return;
  }
  if (!Array.isArray(parsed)) {
    showMsg(msg, 'error', '✕ Expected a JSON array [ ... ].');
    return;
  }
  let added = 0, skipped = 0;
  parsed.forEach(item => {
    if (!item.college || !item.course || isNaN(parseFloat(item.fee))) {
      skipped++; return;
    }
    data.push({
      id:       nextId++,
      college:  String(item.college).trim(),
      course:   String(item.course).trim(),
      fee:      parseFloat(item.fee),
      duration: item.duration || '',
      city:     item.city || '',
      type:     item.type || 'Private',
    });
    added++;
  });
  saveData();
  buildDropdowns();
  applyFilters();
  updateStats();
  renderAdminTable();
  showMsg(msg, 'success', `✓ Added ${added} entries.${skipped ? ' Skipped ' + skipped + ' invalid.' : ''}`);
  document.getElementById('bulkJson').value = '';
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showMsg(el, type, text) {
  el.textContent = text;
  el.className = 'form-msg ' + type;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.textContent = ''; el.className = 'form-msg'; }, 4000);
}
