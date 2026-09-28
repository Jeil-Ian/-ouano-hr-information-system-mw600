// data.js — shared data layer. Talks to the PHP/MySQL API in /api.
// Function names match the old localStorage version, but the data ones are now async.

async function api(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}
const post = (url, record) => api(url, { method: 'POST', body: JSON.stringify(record) });

const getEmployees = () => api('api/employees.php');
const upsertEmployee = (record) => post('api/employees.php', record);
const deleteEmployee = (id) => api('api/employees.php?id=' + encodeURIComponent(id), { method: 'DELETE' });
async function getEmployeeById(id) { return (await getEmployees()).find(e => e.id === id); }

const getDepartments = () => api('api/departments.php');
const upsertDepartment = (record) => post('api/departments.php', record);
const deleteDepartment = (id) => api('api/departments.php?id=' + encodeURIComponent(id), { method: 'DELETE' });

function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusClass(status) {
  if (status === 'Active') return 'active';
  if (status === 'On Leave') return 'leave';
  return 'terminated';
}

function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}
