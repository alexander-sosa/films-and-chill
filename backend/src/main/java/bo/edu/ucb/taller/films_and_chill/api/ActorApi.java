package bo.edu.ucb.taller.films_and_chill.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.ActorSearch;
import bo.edu.ucb.taller.films_and_chill.dto.Actor;

@RestController()
public class ActorApi {
    ActorSearch actorSearch;

    @Autowired
    public ActorApi(ActorSearch actorSearch) {
        this.actorSearch = actorSearch;
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/actor/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Actor> listByMovie(@PathVariable(name = "movie_id") int movie_id){
        return actorSearch.listByMovie(movie_id);
    }
}
