package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.dto.User;
import bo.edu.ucb.taller.films_and_chill.exception.DatabaseException;

@Component
public class UserSignin {
    
    private final UserDao userDao;

    @Autowired
    public UserSignin(UserDao userDao) {
        this.userDao = userDao;
    }

    public String saveUser(User user){
        if(user == null){
            throw new DatabaseException(403, "403");
        }
        this.userDao.saveUser(user);
        return "Usuario guardado con éxito";
    } 
}
