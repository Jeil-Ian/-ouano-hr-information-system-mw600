// data.js — shared data layer. All pages load this before their own script.
// Uses localStorage as a stand-in database so records persist between pages/reloads.

const DB_KEYS = {
  employees: 'hris_employees',
  departments: 'hris_departments'
};

function seedData() {
  if (!localStorage.getItem(DB_KEYS.departments)) {
    const departments = [
      { id: 'd1', name: 'Engineering', head: 'Mara Villanueva', description: 'Builds and maintains product systems.' },
      { id: 'd2', name: 'People & Culture', head: 'Josef Lin', description: 'Handles hiring, benefits, and employee relations.' },
      { id: 'd3', name: 'Finance', head: 'Priya Ramesh', description: 'Manages payroll, budgeting, and accounts.' },
      { id: 'd4', name: 'Sales', head: 'Diego Fontana', description: 'Drives new business and account growth.' }
    ];
    localStorage.setItem(DB_KEYS.departments, JSON.stringify(departments));
  }
  if (!localStorage.getItem(DB_KEYS.employees)) {
    // Starts empty — add employees yourself via the "+ Add employee" button.
    localStorage.setItem(DB_KEYS.employees, JSON.stringify([]));
  }
}

function getEmployees() {
  return JSON.parse(localStorage.getItem(DB_KEYS.employees) || '[]');
}
function saveEmployees(list) {
  localStorage.setItem(DB_KEYS.employees, JSON.stringify(list));
}
function getEmployeeById(id) {
  return getEmployees().find(e => e.id === id);
}
function deleteEmployee(id) {
  saveEmployees(getEmployees().filter(e => e.id !== id));
}
function upsertEmployee(record) {
  const list = getEmployees();
  const i = list.findIndex(e => e.id === record.id);
  if (i === -1) {
    list.push(record);
  } else {
    list[i] = record;
  }
  saveEmployees(list);
}

function getDepartments() {
  return JSON.parse(localStorage.getItem(DB_KEYS.departments) || '[]');
}
function saveDepartments(list) {
  localStorage.setItem(DB_KEYS.departments, JSON.stringify(list));
}
function getDepartmentById(id) {
  return getDepartments().find(d => d.id === id);
}
function deleteDepartment(id) {
  saveDepartments(getDepartments().filter(d => d.id !== id));
}
function upsertDepartment(record) {
  const list = getDepartments();
  const i = list.findIndex(d => d.id === record.id);
  if (i === -1) {
    list.push(record);
  } else {
    list[i] = record;
  }
  saveDepartments(list);
}
function employeeCountForDept(deptId) {
  return getEmployees().filter(e => e.departmentId === deptId).length;
}

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

seedData();
