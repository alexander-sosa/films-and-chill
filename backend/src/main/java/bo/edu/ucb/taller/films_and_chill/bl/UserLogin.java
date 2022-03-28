package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.UserDao;

@Component
public class UserLogin {
    
    private final UserDao userDao;

    @Autowired
    public UserLogin(UserDao userDao) {
        this.userDao = userDao;
    }

    public void saveUser(){
        this.userDao.saveUser();
    } 
}
