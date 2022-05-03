-- creation
CREATE DATABASE films_chill;
USE films_chill;

CREATE TABLE genre(
	genreid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	genre varchar(20) NOT NULL,
	imagelink varchar(255),
	tuplestatus bool DEFAULT 1,
	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE rating(
	ratingid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	rating varchar(10) NOT NULL,
	tuplestatus bool DEFAULT 1,
	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE movie (
    movieid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description text,
    releaseyear int,
    cost double(5,2) NOT NULL,
    stock int NOT NULL,
	ratingid int NOT NULL,
	genreid int NOT NULL,
	imagelink varchar(255),
	tuplestatus bool DEFAULT 1,
    lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ratingid) REFERENCES rating(ratingid),
    FOREIGN KEY (genreid) REFERENCES genre(genreid),
    INDEX (title)
);

CREATE TABLE actor (
    actorid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname varchar(20) NOT NULL,
    lastname varchar(20) NOT NULL,
	tuplestatus bool DEFAULT 1,
    lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE actormovie (
	actormovieid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    movieid int NOT NULL,
    actorid int NOT NULL,
	tuplestatus bool DEFAULT 1,
    lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movieid) REFERENCES movie(movieid),
    FOREIGN KEY (actorid) REFERENCES actor(actorid)
);

CREATE TABLE permission(
	permissionid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  	description varchar(30),
  	tuplestatus bool DEFAULT 1,
  	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

/*CREATE TABLE user (
	user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(30),
	lastname varchar(30),
	permission_id int NOT NULL,
	email varchar(100) UNIQUE,
	pass text,
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
);*/
