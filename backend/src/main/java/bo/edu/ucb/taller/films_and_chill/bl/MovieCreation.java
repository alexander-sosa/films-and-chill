package bo.edu.ucb.taller.films_and_chill.bl;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.MovieDao;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@Component
public class MovieCreation {
    private final MovieDao movieDao;

    @Autowired
    public MovieCreation(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    public ResponseEntity<?> createNewMovie(Movie movie){

        //Datos nulos inválidos: title, cost, stock, rating_id, genre_id
        if(movie == null || movie.getTitle() == null || movie.getCost() == null
          || movie.getStock() == null || movie.getRating_id() == null || movie.getGenre_id() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos inválidos");
        //Datos nulos validos: description, release_year, image_link
        if(movie.getDescription() == null)
        movie.setDescription("");
    
        if(movie.getRelease_year() == null)
            movie.setRelease_year(0);
        
        if(movie.getImage_link() == null)
            movie.setImage_link("");

        movieDao.createNewMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body("Creado");
    }

    public ResponseEntity<?> updateMovie(int movie_id, Movie movie){
        if(movie.getMovie_id() != null || movie == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID no puede ser editado");
        /*
                       "        m.title, " + 
                       "        m.description, " + 
                       "        m.release_year, " + 
                       "        m.cost, " + 
                       "        m.rating_id, " + 
                       "        m.genre_id, " + 
                       "        m.image_link, " + 
                       "        m.stock, " +
                       "        m.tuple_status, " + 
                       "        m.last_update " + 
        */
        if(movie.getTitle() == null)
            movie.setTitle("");
        
        if(movie.getDescription() == null)
            movie.setDescription("");
        
        if(movie.getRelease_year() == null)
            movie.setRelease_year(0);
        
        if(movie.getCost() == null)
            movie.setCost(0.0);
        
        if(movie.getRating_id() == null)
            movie.setRating_id(0);

        if(movie.getImage_link() == null)
            movie.setImage_link("");
        
        if(movie.getStock() == null)
            movie.setStock(0);

        if(movie.getTuple_status() == null)
            movie.setTuple_status(true);

        if(movie.getLast_update() == null)
            movie.setLast_update(new Timestamp(System.currentTimeMillis()));
        
        movieDao.updateMovie(movie_id, movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(movie); 
    }
}
