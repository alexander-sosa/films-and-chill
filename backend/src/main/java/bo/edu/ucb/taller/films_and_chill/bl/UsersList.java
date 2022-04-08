package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.dto.User;

import java.util.List;

@Component
public class UsersList {
    
    private final UserDao userDao;

    @Autowired
    public UsersList(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<User> UserListing(){
        return this.userDao.ListUsers();
    }
}

