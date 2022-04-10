package bo.edu.ucb.taller.films_and_chill.api;

//import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.MovieCreation;
import bo.edu.ucb.taller.films_and_chill.bl.MovieSearch;
//import bo.edu.ucb.taller.films_and_chill.dto.Movie;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@RestController()
public class MovieApi {
    
    MovieSearch movieSearch;
    MovieCreation movieCreation;

    @Autowired
    public MovieApi(MovieSearch movieSearch, MovieCreation movieCreation) {
        this.movieSearch = movieSearch;
        this.movieCreation = movieCreation;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listAllMovies(){
        return movieSearch.listAllMovies();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findById (@PathVariable(name = "movie_id") int movie_id){
        return movieSearch.findById(movie_id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "/movie/new", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewMovie (@RequestBody Movie movie){
        return movieCreation.createNewMovie(movie);
    }
}
