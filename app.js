const REQUIRED = ['name', 'register_number', 'email', 'phone', 'department', 'year', 'cgpa'];
const KEY = 'sms_students_v1';
const HISTORY_KEY = 'sms_import_history_v1';

function getStudents() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

function saveStudents(value) {
  localStorage.setItem(KEY, JSON.stringify(value));
}

function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

function saveHistory(value) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;'
  } [c]));
}

function toast(message, type = 'success') {
  const el = document.createElement('div');
  el.className = 'toast card px-4 py-3 text-sm font-semibold';
  el.style.color = type === 'error' ? 'var(--color-danger)' : 'var(--color-success)';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function downloadTemplate() {
  const blob = new Blob([REQUIRED.join(',') + '\n'], {
    type: 'text/csv'
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'student_template.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function parseCSV(text) {
  const rows = [];
  let row = [],
    cell = '',
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i],
      next = text[i + 1];
    if (ch === '"' && quoted && next === '"') {
      cell += '"';
      i++;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((ch === '\n' || ch === '\r') && !quoted) {
      if (ch === '\r' && next === '\n') i++;
      row.push(cell);
      if (row.some(x => x.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) {
    row.push(cell);
    if (row.some(x => x.trim() !== '')) rows.push(row);
  }
  return rows;
}

function validateRows(text) {
  const rows = parseCSV(text);
  if (!rows.length) return {
    error: 'CSV file is empty.'
  };
  const headers = rows[0].map(x => x.trim().toLowerCase());
  const missing = REQUIRED.find(x => !headers.includes(x));
  if (missing) return {
    error: `Invalid CSV format. Missing required column: ${missing}`
  };
  const indexes = Object.fromEntries(REQUIRED.map(x => [x, headers.indexOf(x)]));
  const existing = getStudents();
  const seenReg = new Set(),
    seenEmail = new Set();
  const valid = [],
    errors = [];
  rows.slice(1).forEach((raw, i) => {
    const rowNo = i + 2;
    const item = Object.fromEntries(REQUIRED.map(k => [k, (raw[indexes[k]] || '').trim()]));
    let err = null;
    if (!item.name) err = ['name', 'Name is required'];
    else if (!item.register_number) err = ['register_number', 'Register number is required'];
    else if (!item.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) err = ['email', 'Enter a valid email'];
    else if (!item.phone || !/^[0-9]{10}$/.test(item.phone)) err = ['phone', 'Phone must be a valid 10-digit number'];
    else if (!item.department) err = ['department', 'Department is required'];
    else if (!/^[1-4]$/.test(item.year)) err = ['year', 'Year must be between 1 and 4'];
    else if (isNaN(Number(item.cgpa)) || Number(item.cgpa) < 0 || Number(item.cgpa) > 10) err = ['cgpa', 'CGPA must be between 0 and 10'];
    else if (existing.some(s => s.register_number === item.register_number) || seenReg.has(item.register_number)) err = ['register_number', `Duplicate register number: ${item.register_number}`];
    else if (existing.some(s => s.email.toLowerCase() === item.email.toLowerCase()) || seenEmail.has(item.email.toLowerCase())) err = ['email', `Duplicate email: ${item.email}`];
    if (err) errors.push({
      row: rowNo,
      field: err[0],
      message: err[1],
      item
    });
    else {
      valid.push(item);
      seenReg.add(item.register_number);
      seenEmail.add(item.email.toLowerCase());
    }
  });
  return {
    headers,
    valid,
    errors,
    total: rows.length - 1
  };
}

function renderSidebar(active = 'dashboard') {
  return `<aside class="sidebar fixed inset-y-0 left-0 z-20 flex flex-col p-4"><div class="mb-8 flex items-center gap-3 px-2"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-lg font-black text-[var(--color-primary-contrast)]">S</div><div class="brand-copy"><div class="font-extrabold">StudentHub</div><div class="text-xs text-[var(--color-muted)]">Management system</div></div></div><nav class="space-y-2"><a class="nav-link ${active==='dashboard'?'active':''} flex items-center gap-3 rounded-xl px-3 py-3 font-semibold" href="/"><span>▦</span><span class="nav-label">Dashboard</span></a><a class="nav-link flex items-center gap-3 rounded-xl px-3 py-3 font-semibold" href="/#students"><span>♙</span><span class="nav-label">Students</span></a><a class="nav-link ${active==='import'?'active':''} flex items-center gap-3 rounded-xl px-3 py-3 font-semibold" href="/import"><span>⇧</span><span class="nav-label">Import Students</span></a><a class="nav-link flex items-center gap-3 rounded-xl px-3 py-3 font-semibold" href="/#reports"><span>▥</span><span class="nav-label">Reports</span></a><a class="nav-link flex items-center gap-3 rounded-xl px-3 py-3 font-semibold" href="/#settings"><span>⚙</span><span class="nav-label">Settings</span></a></nav><div class="sidebar-foot mt-auto rounded-xl bg-[var(--color-bg)] p-3 text-xs text-[var(--color-muted)]">Secure local workspace</div></aside>`;
}

function layout(content, active) {
  return `<div class="page-shell">${renderSidebar(active)}<main class="ml-[78px] min-h-screen md:ml-[260px]"><div class="mobile-top hidden items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] p-4"><b>StudentHub</b></div><div class="mx-auto max-w-[1440px] p-5 sm:p-8">${content}</div></main></div>`;
}

function studentRows(list) {
  return list.map((s, i) => `<tr class="border-t border-[var(--color-border)]"><td class="px-5 py-4 font-semibold">${escapeHtml(s.name)}</td><td class="px-5 py-4 text-[var(--color-muted)]">${escapeHtml(s.register_number)}</td><td class="px-5 py-4 text-[var(--color-muted)]">${escapeHtml(s.email)}</td><td class="px-5 py-4">${escapeHtml(s.department)}</td><td class="px-5 py-4">Year ${escapeHtml(s.year)}</td><td class="px-5 py-4 font-semibold">${escapeHtml(s.cgpa)}</td><td class="px-5 py-4"><button class="text-[var(--color-danger)]" onclick="removeStudent(${i})">Delete</button></td></tr>`).join('') || `<tr><td colspan="7" class="px-5 py-12 text-center text-[var(--color-muted)]">No students found. Add a student or import a CSV to begin.</td></tr>`;
}

function removeStudent(i) {
  const data = getStudents();
  data.splice(i, 1);
  saveStudents(data);
  renderDashboard();
  toast('Student deleted.');
}

function renderDashboard() {
  const students = getStudents();
  const content = `<header class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p class="mb-2 text-sm font-semibold text-[var(--color-primary)]">Overview</p><h1 class="text-3xl font-black tracking-tight sm:text-4xl">Student Management System</h1><p class="mt-2 text-[var(--color-muted)]">Track, organize, and manage your student records.</p></div><button class="btn-primary" onclick="openAdd()">＋ Add Student</button></header><section class="mb-8 grid gap-4 sm:grid-cols-3"><div class="card p-5"><p class="text-sm text-[var(--color-muted)]">Total Students</p><p class="mt-2 text-3xl font-black">${students.length}</p></div><div class="card p-5"><p class="text-sm text-[var(--color-muted)]">Year 1 Students</p><p class="mt-2 text-3xl font-black">${students.filter(s=>s.year==='1').length}</p></div><div class="card p-5"><p class="text-sm text-[var(--color-muted)]">Year 2 Students</p><p class="mt-2 text-3xl font-black">${students.filter(s=>s.year==='2').length}</p></div></section><section id="students" class="card overflow-hidden"><div class="flex flex-col gap-4 border-b border-[var(--color-border)] p-5 lg:flex-row lg:items-center lg:justify-between"><div><h2 class="text-xl font-extrabold">Student Records</h2><p class="mt-1 text-sm text-[var(--color-muted)]">${students.length} active records</p></div><div class="flex flex-col gap-3 sm:flex-row"><input id="search" class="input sm:w-64" placeholder="Search students..." oninput="filterStudents()"><select id="dept" class="input sm:w-40" onchange="filterStudents()"><option value="">All departments</option>${[...new Set(students.map(s=>s.department))].sort().map(d=>`<option>${escapeHtml(d)}</option>`).join('')}</select><select id="year" class="input sm:w-32" onchange="filterStudents()"><option value="">All years</option><option>1</option><option>2</option><option>3</option><option>4</option></select><a class="btn-primary whitespace-nowrap text-center" href="/import">📥 Import CSV</a></div></div><div class="table-wrap"><table class="w-full text-left text-sm"><thead class="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]"><tr><th class="px-5 py-4">Student</th><th class="px-5 py-4">Register No.</th><th class="px-5 py-4">Email</th><th class="px-5 py-4">Dept</th><th class="px-5 py-4">Year</th><th class="px-5 py-4">CGPA</th><th class="px-5 py-4">Actions</th></tr></thead><tbody id="student-list">${studentRows(students)}</tbody></table></div></section>${addModal()}`;
  document.getElementById('app').innerHTML = layout(content, 'dashboard');
}

function filterStudents() {
  const q = (document.getElementById('search').value || '').toLowerCase(),
    d = document.getElementById('dept').value,
    y = document.getElementById('year').value;
  const list = getStudents().filter(s => (s.name + s.register_number + s.email).toLowerCase().includes(q) && (!d || s.department === d) && (!y || s.year === y));
  document.getElementById('student-list').innerHTML = studentRows(list);
}

function addModal() {
  return `<div id="add-modal" class="modal-backdrop fixed inset-0 z-40 hidden items-center justify-center p-4"><div class="card w-full max-w-xl p-6"><div class="flex items-start justify-between"><div><h2 class="text-2xl font-black">Add Student</h2><p class="mt-1 text-sm text-[var(--color-muted)]">Create a new student record.</p></div><button onclick="closeAdd()" class="text-xl text-[var(--color-muted)]">×</button></div><form class="mt-6 grid gap-4 sm:grid-cols-2" onsubmit="addStudent(event)">${REQUIRED.map(k=>`<label class="text-sm font-semibold ${k==='name'||k==='email'?'sm:col-span-2':''}">${k.replace('_',' ').replace(/\b\w/g,c=>c.toUpperCase())}<input name="${k}" class="input mt-2" ${k==='cgpa'?'step="0.1"':''} required></label>`).join('')}<div class="flex justify-end gap-3 sm:col-span-2"><button type="button" class="btn-secondary" onclick="closeAdd()">Cancel</button><button class="btn-primary">Save Student</button></div></form></div></div>`;
}

function openAdd() {
  document.getElementById('add-modal').classList.replace('hidden', 'flex')
}

function closeAdd() {
  document.getElementById('add-modal').classList.replace('flex', 'hidden')
}

function addStudent(e) {
  e.preventDefault();
  const item = Object.fromEntries(new FormData(e.target));
  const result = validateRows(REQUIRED.join(',') + '\n' + REQUIRED.map(k => item[k]).join(','));
  if (result.errors.length) {
    toast(result.errors[0].message, 'error');
    return;
  }
  saveStudents([...getStudents(), item]);
  closeAdd();
  renderDashboard();
  toast('Student added successfully.');
}

function importPage() {
  document.getElementById('app').innerHTML = layout(`<header class="mb-8"><p class="mb-2 text-sm font-semibold text-[var(--color-primary)]">Bulk operations</p><h1 class="text-3xl font-black">Import Students from CSV</h1><p class="mt-2 text-[var(--color-muted)]">Upload, review, and safely add multiple student records at once.</p></header><div class="grid gap-6 xl:grid-cols-[1fr_360px]"><section class="card p-6"><div id="upload-area"><div id="drop-zone" class="drop-zone flex min-h-64 cursor-pointer flex-col items-center justify-center p-8 text-center"><div class="mb-4 text-5xl">📄</div><h2 class="text-xl font-extrabold">Drop CSV file here</h2><p class="mt-2 text-[var(--color-muted)]">or click to browse</p><input id="csv-file" type="file" accept=".csv,text/csv" class="hidden"><button class="btn-primary mt-6" type="button" onclick="document.getElementById('csv-file').click()">Choose CSV File</button></div><div class="mt-4 flex flex-col justify-between gap-3 text-sm text-[var(--color-muted)] sm:flex-row"><span>Supported format: .csv</span><span>Maximum file size: 5 MB</span></div></div><div id="preview" class="hidden"></div></section><aside class="space-y-6"><div class="card p-6"><h2 class="text-lg font-extrabold">Need a starting point?</h2><p class="mt-2 text-sm leading-6 text-[var(--color-muted)]">Use our clean template with the exact columns expected by the importer.</p><button class="btn-secondary mt-5 w-full" onclick="downloadTemplate()">↓ Download CSV Template</button></div><div class="card p-6"><h2 class="text-lg font-extrabold">Import History</h2><div id="history" class="mt-4">${historyMarkup()}</div></div></aside></div>`, 'import');
  setupImport();
}

function historyMarkup() {
  const h = getHistory();
  return h.length ? h.slice(0, 5).map(x => `<div class="border-t border-[var(--color-border)] py-3 text-xs"><div class="font-semibold">${escapeHtml(x.filename)}</div><div class="mt-1 text-[var(--color-muted)]">${escapeHtml(x.date)} · ${x.imported} imported · ${x.failed} failed</div></div>`).join('') : '<p class="text-sm text-[var(--color-muted)]">No imports yet.</p>';
}
let importData = null;

function setupImport() {
  const zone = document.getElementById('drop-zone'),
    input = document.getElementById('csv-file');
  ['dragenter', 'dragover'].forEach(e => zone.addEventListener(e, ev => {
    ev.preventDefault();
    zone.classList.add('dragging')
  }));
  ['dragleave', 'drop'].forEach(e => zone.addEventListener(e, ev => {
    ev.preventDefault();
    zone.classList.remove('dragging')
  }));
  zone.addEventListener('drop', e => handleFile(e.dataTransfer.files[0]));
  input.addEventListener('change', e => handleFile(e.target.files[0]));
}

function handleFile(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.csv')) return toast('Please choose a .csv file.', 'error');
  if (!file.size) return toast('CSV file is empty.', 'error');
  if (file.size > 5 * 1024 * 1024) return toast('File size must be under 5 MB.', 'error');
  const reader = new FileReader();
  reader.onload = () => {
    importData = {
      file,
      result: validateRows(reader.result)
    };
    showPreview()
  };
  reader.readAsText(file);
}

function showPreview() {
  const p = document.getElementById('preview'),
    r = importData.result;
  if (r.error) {
    p.classList.remove('hidden');
    p.innerHTML = `<div class="rounded-xl bg-red-50 p-4 text-sm font-semibold text-[var(--color-danger)]">${escapeHtml(r.error)}<br><span class="font-normal">Required columns: ${REQUIRED.join(', ')}</span></div>`;
    return;
  }
  p.classList.remove('hidden');
  p.innerHTML = `<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 class="text-xl font-extrabold">Import Preview</h2><p class="mt-1 text-sm text-[var(--color-muted)]">${r.total} records found · ${escapeHtml(importData.file.name)}</p></div><button class="text-sm font-semibold text-[var(--color-primary)]" onclick="location.reload()">Choose another</button></div><div class="my-5 grid gap-3 sm:grid-cols-3"><div class="rounded-xl bg-green-50 p-4"><div class="text-xs text-[var(--color-muted)]">Valid Records</div><b class="text-2xl text-[var(--color-success)]">${r.valid.length}</b></div><div class="rounded-xl bg-red-50 p-4"><div class="text-xs text-[var(--color-muted)]">Invalid Records</div><b class="text-2xl text-[var(--color-danger)]">${r.errors.length}</b></div><div class="rounded-xl bg-amber-50 p-4"><div class="text-xs text-[var(--color-muted)]">Duplicate Records</div><b class="text-2xl text-amber-600">${r.errors.filter(e=>e.message.toLowerCase().includes('duplicate')).length}</b></div></div><div class="table-wrap rounded-xl border border-[var(--color-border)]"><table class="w-full text-left text-sm"><thead class="bg-[var(--color-bg)] text-xs uppercase text-[var(--color-muted)]"><tr><th class="px-4 py-3">Name</th><th class="px-4 py-3">Register No.</th><th class="px-4 py-3">Department</th><th class="px-4 py-3">Year</th><th class="px-4 py-3">CGPA</th></tr></thead><tbody>${r.valid.slice(0,100).map(s=>`<tr class="border-t border-[var(--color-border)]"><td class="px-4 py-3 font-semibold">${escapeHtml(s.name)}</td><td class="px-4 py-3">${escapeHtml(s.register_number)}</td><td class="px-4 py-3">${escapeHtml(s.department)}</td><td class="px-4 py-3">${s.year}</td><td class="px-4 py-3">${s.cgpa}</td></tr>`).join('')}</tbody></table></div>${r.errors.length?`<div class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-[var(--color-danger)]"><b>Rows requiring attention</b>${r.errors.slice(0,8).map(e=>`<div class="mt-2">Row ${e.row} · ${escapeHtml(e.field)}: ${escapeHtml(e.message)}</div>`).join('')}</div>`:''}<div class="mt-6 flex justify-end gap-3"><button class="btn-secondary" onclick="location.reload()">Cancel</button><button class="btn-primary" onclick="importValid()" ${!r.valid.length?'disabled':''}>Import Valid Records</button></div>`;
}

function importValid() {
  const btn = document.querySelector('#preview .btn-primary');
  btn.disabled = true;
  btn.textContent = 'Importing students...';
  setTimeout(() => {
    const r = importData.result;
    saveStudents([...getStudents(), ...r.valid]);
    const h = getHistory();
    h.unshift({
      filename: importData.file.name,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      imported: r.valid.length,
      failed: r.errors.length
    });
    saveHistory(h);
    toast(`✓ Import completed successfully — ${r.valid.length} students imported.`);
    setTimeout(() => location.href = '/', 900)
  }, 500)
}

if (document.getElementById('app')) {
  if (location.pathname.startsWith('/import')) importPage();
  else renderDashboard();
}
