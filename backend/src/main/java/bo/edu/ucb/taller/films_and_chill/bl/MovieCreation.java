package bo.edu.ucb.taller.films_and_chill.bl;

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

        if(movie == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos inválidos");

        movieDao.createNewMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body("Creado");
    }
}
