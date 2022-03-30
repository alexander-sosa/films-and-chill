-- creation
CREATE DATABASE films_chill;
USE films_chill;

CREATE TABLE genre(
	genre_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	genre varchar(20) NOT NULL,
	tuple_status bool DEFAULT 1,
	last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE rating(
	rating_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	rating varchar(10) NOT NULL,
	tuple_status bool DEFAULT 1,
	last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE movie (
    movie_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description text,
    release_year int,
    cost double(5,2) NOT NULL,
	stock int NOT NULL, 
	rating_id int NOT NULL,
	genre_id int NOT NULL,
	image_link varchar(200),
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rating_id) REFERENCES rating(rating_id),
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
    INDEX (title)
);

CREATE TABLE actor (
    actor_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE actor_movie (
	actor_movie_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    movie_id int NOT NULL,
    actor_id int NOT NULL,
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
    FOREIGN KEY (actor_id) REFERENCES actor(actor_id)
);

CREATE TABLE user (
	user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(30),
	lastname varchar(30),
	access_permission varchar(20),
	email varchar(60) UNIQUE,
	pass varchar(60),
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
