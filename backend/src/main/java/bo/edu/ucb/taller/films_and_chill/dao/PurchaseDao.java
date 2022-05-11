package bo.edu.ucb.taller.films_and_chill.dao;

import bo.edu.ucb.taller.films_and_chill.dto.PurchaseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.dto.Purchase;

@Repository
public interface PurchaseDao extends JpaRepository<Purchase, Integer> {
    //@Query(value = "SELECT p FROM Purchase p ORDER BY p.purchaseid DESC")
    public Optional<Purchase> findTopByOrderByPurchaseidDesc();

    /*
    @Query(value = "select p.purchaseid, p.userid, u.name, u.lastname, p.totalcost, p.purchasedate, p.address from purchase p, user u where p.purchaseid = u.userid", nativeQuery = true)
    @Query(value = "select new PurchaseDto(p.purchaseid, p.userid, u.name, u.lastname, p.totalcost, p.purchasedate, p.address) from purchas")
    public List<PurchaseDto> getAllPurchases();
    */
}
