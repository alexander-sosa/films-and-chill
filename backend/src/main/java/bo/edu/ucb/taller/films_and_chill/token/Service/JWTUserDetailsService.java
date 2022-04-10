package bo.edu.ucb.taller.films_and_chill.token.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bo.edu.ucb.taller.films_and_chill.token.Dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;
import bo.edu.ucb.taller.films_and_chill.token.Model.UserDTO;

@Service
public class JWTUserDetailsService implements UserDetailsService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DAOUser user = userDao.findByUsername(username);

        if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPass(),
				new ArrayList<>());
    }

    public DAOUser save(UserDTO user) {
		DAOUser newUser = new DAOUser();
        newUser.setName(user.getName());
        newUser.setLastname(user.getLastname());
        newUser.setPermission_id(user.getPermission_id());
		newUser.setUsername(user.getEmail());
		newUser.setPass(bcryptEncoder.encode(user.getPass()));
        newUser.setTuple_status(true);

        Instant instant = Instant.now();
        newUser.setLast_update(new Timestamp(instant.toEpochMilli()));

        if(newUser.getPermission_id() == 1)
            newUser.setAccess_permission("admin");
        else if(newUser.getPermission_id() == 2)
            newUser.setAccess_permission("client");

		return userDao.save(newUser);
	}

    public DAOUser updateRol(UserDTO user){
        DAOUser newUser = userDao.findByUsername(user.getEmail());
        if(user.getAccess_permission().equals("admin"))
            newUser.setPermission_id(1);
        else if(user.getAccess_permission().equals("client"))
            newUser.setPermission_id(2);
        return userDao.save(newUser);
    }

    public Iterable<DAOUser> listAll(){
        return userDao.findAll();
    }
}
