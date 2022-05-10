package bo.edu.ucb.taller.films_and_chill.token.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;

@Repository
public interface UserDao extends JpaRepository<DAOUser, Integer> {
    DAOUser findByUsername(String username);
    Page<DAOUser> findByTuplestatus(Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
}
