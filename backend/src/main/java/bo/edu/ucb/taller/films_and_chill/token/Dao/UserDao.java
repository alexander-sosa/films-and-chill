package bo.edu.ucb.taller.films_and_chill.token.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Integer> {
    DAOUser findByUsername(String username);
}
