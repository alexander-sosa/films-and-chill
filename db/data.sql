-- data
INSERT INTO genre (genre) VALUES 
('ciencia ficcion'),
('accion'),
('fantasia'),
('drama'),
('comedia');

INSERT INTO rating (rating) VALUES
('G'),
('PG'),
('PG-13'),
('R'),
('NC-17');

INSERT INTO movie (title, cost, rating_id, genre_id, image_link) VALUES
('Harry Potter y la Orden del Fenix', 15.5, 3, 3, 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/main/images/harrypotter.jpg'),
('Avengers: Infinity War', 20.5, 2, 2, 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/main/images/avengers.jpg'),
('Son Como Niños 2', 13.6, 3, 5, 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/main/images/grownups.jpg'),
('Interestelar', 15.2, 1, 1, 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/main/images/interstellar.jpg'),
('Las Crónicas de Narnia: El Leon, la Bruja y el Armario', 12.3, 1, 3, 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/main/images/narnia.jpg');

INSERT INTO actor (first_name, last_name) VALUES
('Daniel', 'Radcliffe'),
('Emma', 'Wattson'),
('Rupert', 'Grint'),
('Robert', 'Downey Jr'),
('Chris', 'Evans'),
('Josh', 'Brolin'),
('Tom', 'Holland'),
('Adam', 'Sandler'),
('Salma', 'Hayek'),
('Matthew', 'McConaughey'),
('Anne', 'Hathaway'),
('William', 'Moseley'),
('Anna', 'Popplewell');

INSERT INTO actor_movie (movie_id, actor_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(5, 12),
(5, 13);
