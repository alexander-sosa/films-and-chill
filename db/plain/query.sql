-- WARNING!
-- Do not execute this script. Made for sample purposes only


-- insert a movie with all data provided
INSERT INTO movie (title, description, release_year, cost, stock, rating_id, genre_id, image_link) VALUES
('Rogue One: Una Historia de Star Wars', 'La batalla de la rebelión por conseguir los planos de la Estrella de la Muerte', 2016, 16.9, 10, 2, 1, '*image_link*')

-- insert a movie only with non null data
INSERT INTO movie (title, cost, stock, rating_id, genre_id) VALUES
('Rogue One: Una Historia de Star Wars', 16.9, 10, 2, 1)

-- edit an existing movie
UPDATE movie 
SET 
title = 'Rogue One',
cost = 11.5,
stock = 2
WHERE movie_id = 10;

-- edit an existing user
UPDATE user 
SET 
name = 'Rogue One',
lastname = 11.5,
email = 2,
pass = 'new hashed pass'
WHERE user_id = 5;

-- number of movie purchases
SELECT count(*), movieid  
FROM moviepurchase 
GROUP BY movieid 
ORDER BY count(*) DESC
LIMIT 12;

-- number of movie stock purchases
SELECT sum(quantity), movieid  
FROM moviepurchase 
GROUP BY movieid 
ORDER BY sum(quantity) DESC
LIMIT 12;