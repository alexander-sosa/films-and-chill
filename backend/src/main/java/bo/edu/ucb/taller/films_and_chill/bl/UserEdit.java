package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.UserDao;

@Component
public class UserEdit {

    private final UserDao userDao;

    @Autowired
    public UserEdit(UserDao userDao) {
        this.userDao = userDao;
    }

    public ResponseEntity<?> setRol(int user_id, String access_permission){
        if(access_permission.equals("admin") || access_permission.equals("client")){
            userDao.setRol(user_id, access_permission);
            return ResponseEntity.status(HttpStatus.OK).body("Permiso Actualizado");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data inválida");
    }
}
