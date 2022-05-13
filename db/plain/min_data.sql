-- Minimum data to work with mockaroo
INSERT INTO genre (genre, imagelink) VALUES 
('ciencia ficcion', 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/sprint-2/images/ciencia-ficcion.jpg'),
('accion', 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/sprint-2/images/accion.jpg'),
('fantasia', 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/sprint-2/images/fantasia.jpg'),
('drama', 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/sprint-2/images/drama.jpg'),
('comedia', 'https://raw.githubusercontent.com/alexander-sosa/films-and-chill/sprint-2/images/comedia.jpg');

INSERT INTO rating (rating) VALUES
('G'),
('PG'),
('PG-13'),
('R'),
('NC-17');

INSERT INTO permission(description) VALUES
('admin'),
('client');
