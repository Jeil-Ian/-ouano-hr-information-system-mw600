<?php
require __DIR__ . '/db.php';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  out(db()->query("SELECT id, name, email, department_id AS departmentId, position, status,
                   DATE_FORMAT(date_hired, '%Y-%m-%d') AS dateHired FROM employees ORDER BY name")->fetchAll());
}

if ($method === 'POST') { // create or update (id supplied by client)
  $b = body();
  $id = str($b['id'] ?? ''); $name = str($b['name'] ?? ''); $email = str($b['email'] ?? '');
  $dept = str($b['departmentId'] ?? '') ?: null; $pos = str($b['position'] ?? '');
  $status = str($b['status'] ?? ''); $date = str($b['dateHired'] ?? '');

  if (!$id || !$name || !$pos) out(['error' => 'Name and position are required.'], 422);
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) out(['error' => 'Enter a valid email.'], 422);
  if (!in_array($status, ['Active', 'On Leave', 'Terminated'], true)) out(['error' => 'Invalid status.'], 422);
  if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) out(['error' => 'Invalid hire date.'], 422);

  $dup = db()->prepare('SELECT 1 FROM employees WHERE email = ? AND id <> ?');
  $dup->execute([$email, $id]);
  if ($dup->fetch()) out(['error' => 'That email is already in use.'], 409);

  $stmt = db()->prepare('INSERT INTO employees (id, name, email, department_id, position, status, date_hired)
    VALUES (?,?,?,?,?,?,?)
    ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), department_id=VALUES(department_id),
      position=VALUES(position), status=VALUES(status), date_hired=VALUES(date_hired)');
  $stmt->execute([$id, $name, $email, $dept, $pos, $status, $date]);
  out(['ok' => true]);
}

if ($method === 'DELETE') {
  db()->prepare('DELETE FROM employees WHERE id = ?')->execute([str($_GET['id'] ?? '')]);
  out(['ok' => true]);
}

out(['error' => 'Method not allowed'], 405);
