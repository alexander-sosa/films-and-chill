package bo.edu.ucb.taller.films_and_chill.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.GenreSearch;

@RestController()
public class GenreApi {
    
    GenreSearch genreSearch;

    @Autowired
    public GenreApi(GenreSearch genreSearch) {
        this.genreSearch = genreSearch;
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/genre", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listAllGenres(){
        return genreSearch.listAllGenres();
    }

    /********* PARA REPORTES *********/

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/genre/report", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> mostSold(){
        return genreSearch.mostSold();
    }
}
