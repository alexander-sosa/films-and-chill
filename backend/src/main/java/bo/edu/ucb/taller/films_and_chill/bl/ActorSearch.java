package bo.edu.ucb.taller.films_and_chill.bl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.ActorDao;
import bo.edu.ucb.taller.films_and_chill.dto.Actor;

@Component
public class ActorSearch {
    private final ActorDao actorDao;

    @Autowired
    public ActorSearch(ActorDao actorDao) {
        this.actorDao = actorDao;
    }

    public List<Actor> listByMovie(int movie_id){
        return actorDao.listByMovie(movie_id);
    }
}
