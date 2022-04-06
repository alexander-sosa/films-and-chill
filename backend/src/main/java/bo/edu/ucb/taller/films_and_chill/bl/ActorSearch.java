package bo.edu.ucb.taller.films_and_chill.bl;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.ActorDao;
//import bo.edu.ucb.taller.films_and_chill.dto.Actor;

@Component
public class ActorSearch {
    private final ActorDao actorDao;

    @Autowired
    public ActorSearch(ActorDao actorDao) {
        this.actorDao = actorDao;
    }

    public ResponseEntity<?> listByMovie(int movie_id){
        if(actorDao.listByMovie(movie_id).size() == 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID inválido");
        }
        return ResponseEntity.ok(actorDao.listByMovie(movie_id));
    }
}
