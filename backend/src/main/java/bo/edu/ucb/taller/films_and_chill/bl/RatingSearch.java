package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.RatingDao;
import bo.edu.ucb.taller.films_and_chill.dto.Rating;

@Component
public class RatingSearch {
    
    private final RatingDao ratingDao;

    @Autowired
    public RatingSearch(RatingDao ratingDao) {
        this.ratingDao = ratingDao;
    }

    public ResponseEntity<?> listAllRatings(){
        return ResponseEntity.ok(ratingDao.listAllRatings());
    }

    public Rating findById (Integer ratingid){
        return ratingDao.findById(ratingid).get(0);
    }
}
