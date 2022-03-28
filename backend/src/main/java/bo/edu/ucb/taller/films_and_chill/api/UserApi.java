package bo.edu.ucb.taller.films_and_chill.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.UserLogin;
import bo.edu.ucb.taller.films_and_chill.dto.User;

@RestController()
public class UserApi {
    
    UserLogin userLogin;

    @Autowired
    public UserApi(UserLogin userLogin) {
        this.userLogin = userLogin;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path ="/user", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void user(@RequestBody User user){ 
        this.userLogin.saveUser();
    }
}
