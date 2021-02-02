CREATE DATABASE IF NOT EXISTS `chemreprogramming` CHARACTER SET utf8mb4;
USE chemreprogramming;

CREATE TABLE MAIN (
	userId INT AUTO_INCREMENT PRIMARY KEY,
	userName VARCHAR(10),
	userPassword VARCHAR(64) );
