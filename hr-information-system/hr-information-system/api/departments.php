<?php
require __DIR__ . '/db.php';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  out(db()->query('SELECT id, name, head, description FROM departments ORDER BY name')->fetchAll());
}

if ($method === 'POST') { // create or update
  $b = body();
  $id = str($b['id'] ?? ''); $name = str($b['name'] ?? ''); $head = str($b['head'] ?? '');
  if (!$id || !$name || !$head) out(['error' => 'Name and department head are required.'], 422);

  $stmt = db()->prepare('INSERT INTO departments (id, name, head, description) VALUES (?,?,?,?)
    ON DUPLICATE KEY UPDATE name=VALUES(name), head=VALUES(head), description=VALUES(description)');
  $stmt->execute([$id, $name, $head, str($b['description'] ?? '')]);
  out(['ok' => true]);
}

if ($method === 'DELETE') { // employees.department_id is set to NULL by the foreign key
  db()->prepare('DELETE FROM departments WHERE id = ?')->execute([str($_GET['id'] ?? '')]);
  out(['ok' => true]);
}

out(['error' => 'Method not allowed'], 405);
