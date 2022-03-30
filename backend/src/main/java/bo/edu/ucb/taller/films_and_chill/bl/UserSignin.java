package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.dto.User;

@Component
public class UserSignin {
    
    private final UserDao userDao;

    @Autowired
    public UserSignin(UserDao userDao) {
        this.userDao = userDao;
    }

    public User saveUser(User user){
        return this.userDao.saveUser(user);
    } 
}
