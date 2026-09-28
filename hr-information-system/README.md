# Personnel Register — Employee/HR Information System

A static frontend mini information system for managing employee records, built with plain HTML, CSS, and JavaScript. No backend — data is stored in the browser's `localStorage`, so it persists across page reloads but stays local to your browser.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Dashboard — headcount, department count, employees on leave, recent hires |
| `employees.html` | View all employees, search/filter, Edit and Delete each record |
| `employee-form.html` | Add a new employee or edit an existing one (same form, reused via a `?id=` query param) |
| `departments.html` | View, add, edit, and delete departments |

## CRUD coverage

- **Create** — Add employee (`employee-form.html`), Add department (`departments.html`)
- **Read** — Dashboard summary, full employee roster with search/filter, department list
- **Update** — Edit employee, edit department
- **Delete** — Remove employee, remove department (with a confirmation prompt; deleting a department warns if employees are still assigned to it)

## Tech

- HTML5 / CSS3 (no framework)
- Vanilla JavaScript
- `localStorage` as the data layer (`js/data.js`), seeded with sample employees and departments on first load

## Running it

**Option 1 — no install, just open the file:**
Double-click `index.html` and it opens directly in your browser.

**Option 2 — run with Node.js:**
This project includes a tiny built-in server (`server.js`) with zero external dependencies, so there's nothing to `npm install`.

```bash
npm start
# then visit http://localhost:3000
```

**Option 3 — Python's built-in server:**
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Resetting the sample data

The app seeds sample records the first time it runs. To start over, open your browser's dev tools console on any page and run:

```js
localStorage.clear();
location.reload();
```

## Project structure

```
hr-information-system/
├── index.html
├── employees.html
├── employee-form.html
├── departments.html
├── css/
│   └── style.css
├── js/
│   └── data.js
├── server.js        # optional tiny Node.js static server (no dependencies)
├── package.json      # enables `npm start`
└── README.md
```
