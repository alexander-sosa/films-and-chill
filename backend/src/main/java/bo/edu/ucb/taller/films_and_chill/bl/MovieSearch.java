package bo.edu.ucb.taller.films_and_chill.bl;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.MovieDao;
//import bo.edu.ucb.taller.films_and_chill.dto.Movie;
//import bo.edu.ucb.taller.films_and_chill.exception.DatabaseException;

//SOLO BUSQUEDA DE PELICULAS
@Component
public class MovieSearch {
    
    private final MovieDao movieDao;

    @Autowired
    public MovieSearch(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    public ResponseEntity<?> listAllMovies(){
        return ResponseEntity.ok(movieDao.listAllMovies());
    }

    public ResponseEntity<?> findById(int movie_id){
        if(movieDao.findById(movie_id).size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
        }
        return ResponseEntity.ok(movieDao.findById(movie_id));
    }
}
