DROP TABLE IF EXISTS `DepartmentStore`;
CREATE TABLE iF NOT EXISTS `DepartmentStore` (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  park_rate INT NOT NULL,
  discount_rate INT NOT NULL,
  amount_rate INT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Parking`;
CREATE TABLE iF NOT EXISTS `Parking` (
  id INT NOT NULL AUTO_INCREMENT,
  status ENUM('parking', 'exit') NOT NULL,
  start_time DATETIME NOT NULL,
  department_store_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_store_id) REFERENCES DepartmentStore (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `DepartmentStore` (id, name, park_rate, discount_rate, amount_rate) VALUES (1990, 'central eastville', 20, 10, 500);
INSERT INTO `DepartmentStore` (id, name, park_rate, discount_rate, amount_rate) VALUES (1991, 'central world', 30, 10, 800);
INSERT INTO `DepartmentStore` (id, name, park_rate, discount_rate, amount_rate) VALUES (1992, 'paragon', 40, 20, 1000);
