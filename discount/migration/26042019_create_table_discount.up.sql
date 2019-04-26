DROP TABLE IF EXISTS `Discount`;
CREATE TABLE iF NOT EXISTS `Discount` (
	id INT NOT NULL AUTO_INCREMENT,
    store VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    park_id INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
