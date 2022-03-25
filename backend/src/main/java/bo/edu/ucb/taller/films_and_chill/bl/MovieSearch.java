package bo.edu.ucb.taller.films_and_chill.bl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.MovieDao;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

//SOLO BUSQUEDA DE PELICULAS
@Component
public class MovieSearch {
    
    private final MovieDao movieDao;

    @Autowired
    public MovieSearch(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    public List<Movie> listAllMovies(){
        return this.movieDao.listAllMovies();
    }
}
