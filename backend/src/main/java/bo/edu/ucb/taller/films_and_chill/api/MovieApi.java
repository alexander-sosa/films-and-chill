package bo.edu.ucb.taller.films_and_chill.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.MovieSearch;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@RestController()
public class MovieApi {
    
    MovieSearch movieSearch;

    @Autowired
    public MovieApi(MovieSearch movieSearch) {
        this.movieSearch = movieSearch;
    }

    @GetMapping(value = "/movie/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Movie> listAllMovies(){
        return movieSearch.listAllMovies();
    }
}
