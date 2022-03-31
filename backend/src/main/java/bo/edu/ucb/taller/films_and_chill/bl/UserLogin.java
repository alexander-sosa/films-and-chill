package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.dto.User;

import java.util.List;

@Component
public class UserLogin {
    
    private final UserDao userDao;

    @Autowired
    public UserLogin(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<User> logIn(String email, String pass){
        return this.userDao.logIn(email, pass);
    }
}
