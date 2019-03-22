CREATE DATABASE IF NOT EXISTS `Park`;
USE Park;
DROP TABLE IF EXISTS `DepartmentStore`;
CREATE TABLE iF NOT EXISTS `DepartmentStore` (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  park_rate INT NOT NULL,
  discount_rate INT NOT NULL,
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

DROP TABLE IF EXISTS `Discount`;
CREATE TABLE iF NOT EXISTS `Discount` (
	id INT NOT NULL AUTO_INCREMENT,
    store VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    park_id INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
