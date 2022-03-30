package bo.edu.ucb.taller.films_and_chill.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.UserSignin;
import bo.edu.ucb.taller.films_and_chill.dto.User;

@RestController()
public class UserApi {
    
    UserSignin userSignin;

    @Autowired
    public UserApi(UserSignin userSignin) {
        this.userSignin = userSignin;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path ="/user", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public User saveUser(@RequestBody User user){ 
        return this.userSignin.saveUser(user);
    }
}
