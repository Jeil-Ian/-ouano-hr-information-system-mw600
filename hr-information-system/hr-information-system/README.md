# Personnel Register — HR Information System (Apache + PHP + MySQL)

Plain HTML/CSS/JS frontend, a small PHP JSON API, and a MySQL database.

## Setup (XAMPP / WAMP / MAMP)
1. Copy this folder to `htdocs/hr-information-system` (XAMPP) and start **Apache** and **MySQL**.
2. Open phpMyAdmin (`http://localhost/phpmyadmin`) → **Import** → choose `database/schema.sql`
   (or run `mysql -u root < database/schema.sql`). This creates the `hr_system` database and seeds the departments.
3. If your MySQL user/password isn't `root` / empty, edit the constants at the top of `api/db.php`.
4. Visit `http://localhost/hr-information-system/`.

Pages must be opened through Apache; double-clicking the HTML files will not work because the API needs PHP.

## Structure
```
index.html, employees.html, employee-form.html, departments.html
css/style.css
js/data.js            fetch() wrapper around the API
api/db.php            PDO connection + helpers
api/employees.php     GET list · POST create/update · DELETE ?id=
api/departments.php   GET list · POST create/update · DELETE ?id=
database/schema.sql   tables, foreign key, seed departments
```

## Notes
- Deleting a department sets its employees' `department_id` to NULL (foreign key `ON DELETE SET NULL`).
- Duplicate employee emails are rejected (UNIQUE constraint + API check).
- All queries use PDO prepared statements.
