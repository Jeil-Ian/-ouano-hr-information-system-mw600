<?php
// Connection settings: XAMPP defaults (user "root", empty password). Change for other setups.
const DB_HOST = 'localhost', DB_NAME = 'hr_system', DB_USER = 'root', DB_PASS = '';

header('Content-Type: application/json; charset=UTF-8');

function db(): PDO {
  static $pdo = null;
  if (!$pdo) {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
  }
  return $pdo;
}
function out($data, int $code = 200): void { http_response_code($code); echo json_encode($data); exit; }
function body(): array { return json_decode(file_get_contents('php://input'), true) ?? []; }
function str($v): string { return trim((string)($v ?? '')); }

set_exception_handler(function ($e) {
  error_log($e->getMessage());
  out(['error' => 'Database error. Is MySQL running and schema.sql imported?'], 500);
});
