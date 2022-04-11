package bo.edu.ucb.taller.films_and_chill.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.RatingSearch;

@RestController()
public class RatingApi {
    
    RatingSearch ratingSearch;

    @Autowired
    public RatingApi(RatingSearch ratingSearch) {
        this.ratingSearch = ratingSearch;
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/movie/rating", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listAllRatings(){
        return ratingSearch.listAllRatings();
    }
}
