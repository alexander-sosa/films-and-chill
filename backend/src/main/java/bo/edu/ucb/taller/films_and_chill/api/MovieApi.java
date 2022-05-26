package bo.edu.ucb.taller.films_and_chill.api;

//import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

//import java.util.HashMap;
//import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.MovieCreation;
import bo.edu.ucb.taller.films_and_chill.bl.MovieSearch;
//import bo.edu.ucb.taller.films_and_chill.dao.MovieDao;
//import bo.edu.ucb.taller.films_and_chill.dto.Movie;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@RestController()
@CrossOrigin
public class MovieApi {
    
    @Autowired
    MovieSearch movieSearch;

    @Autowired
    MovieCreation movieCreation;

    /*@Autowired
    public MovieApi(MovieSearch movieSearch, MovieCreation movieCreation) {
        this.movieSearch = movieSearch;
        //this.movieCreation = movieCreation;
    }*/

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listAllMovies(@RequestParam(required = false) Integer genreId,
                                           @RequestParam(required = false) String search,
                                           @RequestParam(defaultValue = "0") Integer page,
                                           @RequestParam(defaultValue = "20") Integer size){

        return movieSearch.listAllMovies(genreId, search, page, size);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findById (@PathVariable(name = "movie_id") int movie_id){
        return movieSearch.findById(movie_id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewMovie (@RequestBody Movie movie){
        return movieCreation.createNewMovie(movie);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping(value = "/movie/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateMovie (@PathVariable(name = "movie_id") int movie_id, @RequestBody Movie movie){
        return movieCreation.updateMovie(movie_id, movie);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(value = "/movie/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteMovie (@PathVariable(name = "movie_id") int movie_id){
        return movieCreation.deleteMovie(movie_id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/latest", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findByReleaseYear (@RequestParam(defaultValue = "0") Integer page,
                                                @RequestParam(defaultValue = "12") Integer size){
        return movieSearch.findByReleaseYear(page, size);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/popular", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findPopular (@RequestParam(defaultValue = "0") Integer page,
                                          @RequestParam(defaultValue = "12") Integer size){
        return movieSearch.findByPopular(page, size);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/purchase/{purchaseid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findPurchase (@RequestParam(defaultValue = "0") Integer page,
                                           @RequestParam(defaultValue = "12") Integer size,
                                           @PathVariable(name = "purchaseid") int purchaseid){
        return movieSearch.findByPurchase(purchaseid, page, size);
    }

    /*@CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/search/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findByTitle(@PathVariable(name = "title") String title,
                                         @RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "20") Integer size){
        //System.out.println(title);
        return movieSearch.findByTitle(title, page, size);
    }*/
}
