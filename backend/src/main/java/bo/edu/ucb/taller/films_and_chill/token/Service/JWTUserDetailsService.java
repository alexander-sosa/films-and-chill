package bo.edu.ucb.taller.films_and_chill.token.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bo.edu.ucb.taller.films_and_chill.token.Dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;
import bo.edu.ucb.taller.films_and_chill.token.Model.RoleRequest;
import bo.edu.ucb.taller.films_and_chill.token.Model.UserDTO;

@Service
public class JWTUserDetailsService implements UserDetailsService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DAOUser user = findByUsername(username);

        if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPass(),
				new ArrayList<>());
    }

    public DAOUser findByUsername(String username){
        return userDao.findByUsername(username);
    }

    public ResponseEntity<?> save(UserDTO user) {
        DAOUser existingUser = findByUsername(user.getUsername());
        if(existingUser != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario existente");
            
        if(user == null || 
            user.getUser_id() != null ||
            user.getName() == null ||
            user.getLastname() == null ||
            user.getUsername() == null ||
            user.getPass() == null ||
            user.getPermission_id() == null)
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos Inválidos");
		
        DAOUser newUser = new DAOUser();
        newUser.setName(user.getName());
        newUser.setLastname(user.getLastname());
        newUser.setPermission_id(user.getPermission_id());
		newUser.setUsername(user.getUsername());
		newUser.setPass(bcryptEncoder.encode(user.getPass()));
        newUser.setTuple_status(true);

        Instant instant = Instant.now();
        newUser.setLast_update(new Timestamp(instant.toEpochMilli()));

		return ResponseEntity.status(HttpStatus.CREATED).body(userDao.save(newUser));
	}

    public ResponseEntity<?>updateUser(UserDTO user, Integer user_id){
        if(user == null || 
           user.getUser_id() != null ||
           user.getName() == null ||
           user.getLastname() == null ||
           user.getPass() == null ||
           user.getPermission_id() == null)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos Inválidos");

        DAOUser existingUser = findByUsername(user.getUsername());
        if(existingUser != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario existente");
        
        Optional<DAOUser> newUser = userDao.findById(user_id);

        newUser.get().setName(user.getName());
        newUser.get().setLastname(user.getLastname());
        newUser.get().setPermission_id(user.getPermission_id());
        newUser.get().setUsername(user.getUsername());
        newUser.get().setPass(bcryptEncoder.encode(user.getPass()));
        newUser.get().setTuple_status(user.getTuple_status());
        newUser.get().setLast_update(user.getLast_update());

        return ResponseEntity.status(HttpStatus.CREATED).body(userDao.save(newUser.get()));
    }

    public ResponseEntity<?> updateRol(RoleRequest user){
        if(user.getUser_editor_id() == null || 
           user.getPermission_id() == null || 
           user.getUser_editee_id() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos inválidos");

        Optional<DAOUser> editee = userDao.findById(user.getUser_editee_id());

        if(user.getUser_editor_id() != 1)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso Denegado");

        editee.get().setPermission_id(user.getPermission_id());
        return ResponseEntity.ok(userDao.save(editee.get()));
    }

    public List<DAOUser> listAll(){
        Iterable<DAOUser> users = userDao.findAll();
        List<DAOUser> allowedUsers = new ArrayList<>();
        for(DAOUser user: users)
            if(user.isTuple_status())
                allowedUsers.add(user);
        return allowedUsers;
    }
}
