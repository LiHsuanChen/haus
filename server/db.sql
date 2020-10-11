DROP DATABASE IF EXISTS haus;

CREATE DATABASE `haus` DEFAULT CHARSET utf8;
USE `haus`;

CREATE TABLE IF NOT EXISTS `user` (
	`id` MEDIUMINT NOT NULL AUTO_INCREMENT,
	`email` varchar(100) NOT NULL UNIQUE,
	`password` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `feedback` (
	`id` MEDIUMINT NOT NULL AUTO_INCREMENT,
	`user_id` MEDIUMINT NOT NULL 
	`payload` varchar(300) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;