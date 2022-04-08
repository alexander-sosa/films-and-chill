-- WARNING!
-- Do not execute this script. Made for sample purposes only

-- insert a movie with all data provided
INSERT INTO movie (title, description, release_year, cost, stock, rating_id, genre_id, image_link) VALUES
('Rogue One: Una Historia de Star Wars', 'La batalla de la rebelión por conseguir los planos de la Estrella de la Muerte', 2016, 16.9, 10, 2, 1, '*image_link*')

-- insert a movie only with non null data
INSERT INTO movie (title, cost, stock, rating_id, genre_id) VALUES
('Rogue One: Una Historia de Star Wars', 16.9, 10, 2, 1)