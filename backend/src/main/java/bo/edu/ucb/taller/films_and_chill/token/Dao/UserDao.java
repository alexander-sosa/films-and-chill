package bo.edu.ucb.taller.films_and_chill.token.Dao;

//import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;

@Repository
public interface UserDao extends JpaRepository<DAOUser, Integer> {
    DAOUser findByUsername(String username);
    Page<DAOUser> findByTuplestatus(Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
    DAOUser findByUseridAndTuplestatus(Integer userid, Boolean tuplestatus);

    @Query(value = " SELECT count(purchase.purchaseid) as purchases_nbr, " + 
                   "        u.userid, " +
                   "        u.name, " +
                   "        u.lastname, " +
                   "        u.permissionid, " +
                   "        u.email, " +
                   "        u.pass, " +
                   "        u.tuplestatus, " +
                   "        u.lastupdate " +
                   " FROM purchase p, User u " + 
                   " WHERE purchase.userid = u.userid " + 
                   " GROUP BY p.userid " + 
                   " ORDER BY count(purchase.purchaseid) DESC ", nativeQuery = true)
    Page<?>findByPurchaseAndTuplestatus(Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
}
