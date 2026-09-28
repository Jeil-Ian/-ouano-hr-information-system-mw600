CREATE DATABASE IF NOT EXISTS hr_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hr_system;

CREATE TABLE IF NOT EXISTS departments (
  id          VARCHAR(32)  PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  head        VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS employees (
  id            VARCHAR(32)  PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  department_id VARCHAR(32)  NULL,
  position      VARCHAR(100) NOT NULL,
  status        ENUM('Active','On Leave','Terminated') NOT NULL DEFAULT 'Active',
  date_hired    DATE NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT IGNORE INTO departments (id, name, head, description) VALUES
 ('d1','Engineering','Mara Villanueva','Builds and maintains product systems.'),
 ('d2','People & Culture','Josef Lin','Handles hiring, benefits, and employee relations.'),
 ('d3','Finance','Priya Ramesh','Manages payroll, budgeting, and accounts.'),
 ('d4','Sales','Diego Fontana','Drives new business and account growth.');
