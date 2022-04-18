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

    public ResponseEntity<?> listAllMovies(Integer genre_id, Integer from){
        if(from != null)
            return ResponseEntity.ok(movieDao.listAllMovies(from, from + 40));
        if(genre_id != null)
            return listAllMoviesByGenre(genre_id, from);
        return ResponseEntity.ok(movieDao.listAllMovies(1, 40));
    }

    public ResponseEntity<?> findById(int movie_id){
        if(movieDao.findById(movie_id).size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
        }
        return ResponseEntity.ok(movieDao.findById(movie_id));
    }

    public ResponseEntity<?> listAllMoviesByGenre(Integer genre_id, Integer from){
        if(from != null)
            return ResponseEntity.ok(movieDao.listAllMoviesByGenre(genre_id, from));

        return ResponseEntity.ok(movieDao.listAllMoviesByGenre(genre_id, 1));
    }
}
