package bo.edu.ucb.taller.films_and_chill.dao;

//import bo.edu.ucb.taller.films_and_chill.dto.PurchaseDto;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;

//import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.dto.Purchase;

//import bo.edu.ucb.taller.films_and_chill.token.Model.*;;

@Repository
public interface PurchaseDao extends JpaRepository<Purchase, Integer> {
    //@Query(value = "SELECT p FROM Purchase p ORDER BY p.purchaseid DESC")
    public Optional<Purchase> findTopByOrderByPurchaseidDesc();

    //@Query(value = " SELECT p, u.name FROM Purchase p, User u WHERE p.tuplestatus = :tuplestatus ")
    /*@Query(value = " SELECT p" + 
                   " FROM Moviepurchase mp, Purchase p " + 
                   " WHERE mp.purchaseid = p.purchaseid " + 
                   " AND p.tuplestatus = :tuplestatus )*/
    Page<Purchase> findByTuplestatus(Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);

    @Query(value = " SELECT mp.quantity as quantity, p" + 
                   " FROM Moviepurchase mp, Purchase p " + 
                   " WHERE mp.purchaseid = p.purchaseid " + 
                   " AND mp.movieid = :movieid" +
                   " AND p.tuplestatus = :tuplestatus")
    Page<Purchase> findByMovieid(Integer movieid, Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
    
    @Query(value = " SELECT mp.quantity as quantity, p" + 
                   " FROM Moviepurchase mp, Purchase p, Movie m " + 
                   " WHERE mp.purchaseid = p.purchaseid " +
                   " AND mp.movieid = m.movieid" + 
                   " AND m.genreid = :genreid" +
                   " AND p.tuplestatus = :tuplestatus")
    Page<Purchase> findByGenreid(Integer genreid, Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
    
    //Page<Purchase> findByUseridAndTuplestatus(Integer userid, Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
    /*
    @Query(value = "select p.purchaseid, p.userid, u.name, u.lastname, p.totalcost, p.purchasedate, p.address from purchase p, user u where p.purchaseid = u.userid", nativeQuery = true)
    @Query(value = "select new PurchaseDto(p.purchaseid, p.userid, u.name, u.lastname, p.totalcost, p.purchasedate, p.address) from purchas")
    public List<PurchaseDto> getAllPurchases();
    */
}
