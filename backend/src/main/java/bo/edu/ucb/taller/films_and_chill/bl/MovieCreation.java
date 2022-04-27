package bo.edu.ucb.taller.films_and_chill.bl;

import java.util.Optional;

import java.sql.Timestamp;
//import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import bo.edu.ucb.taller.films_and_chill.dao.MovieDao;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@Service
public class MovieCreation{

    @Autowired
    private MovieDao movieDao;

    public ResponseEntity<?> createNewMovie(Movie movie){
        //Datos nulos inválidos: title, cost, stock, rating_id, genre_id
        if(movie == null || movie.getTitle() == null || movie.getCost() == null
          || movie.getStock() == null || movie.getRatingid() == null || movie.getGenreid() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos inválidos");
        //Datos nulos validos: description, release_year, image_link
        if(movie.getDescription() == null)
        movie.setDescription("");
    
        if(movie.getReleaseyear() == null)
            movie.setReleaseyear(0);
        
        if(movie.getImagelink() == null)
            movie.setImagelink("");

        movie.setLastupdate(new Timestamp(System.currentTimeMillis()));
        //movieDao.save(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(movieDao.save(movie));
    }

    public ResponseEntity<?> updateMovie(int movie_id, Movie movie){
        if(movie.getMovieid() != null || movie == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID no puede ser editado");

        Optional<Movie> newMovie = movieDao.findById(movie_id);

        newMovie.get().setTitle(movie.getTitle());
        newMovie.get().setDescription(movie.getDescription());
        newMovie.get().setReleaseyear(movie.getReleaseyear());
        newMovie.get().setCost(movie.getCost());
        newMovie.get().setRatingid(movie.getRatingid());
        newMovie.get().setImagelink(movie.getImagelink());
        newMovie.get().setStock(movie.getStock());

        if(movie.getTuplestatus() == null)
            newMovie.get().setTuplestatus(true);
        else
            newMovie.get().setTuplestatus(movie.getTuplestatus());
        
        newMovie.get().setLastupdate(new Timestamp(System.currentTimeMillis()));
        
        return ResponseEntity.status(HttpStatus.CREATED).body(movieDao.save(newMovie.get())); 
    }
    
    public ResponseEntity<?> deleteMovie(int movie_id){
        if(movieDao.findById(movie_id).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
        }

        Optional<Movie> newMovie = movieDao.findById(movie_id);
        newMovie.get().setTuplestatus(false);

        return ResponseEntity.ok(movieDao.save(newMovie.get()));
    }
}
/*@Component
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
}*/
