package bo.edu.ucb.taller.films_and_chill.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.dto.Purchase;

@Repository
public interface PurchaseDao extends JpaRepository<Purchase, Integer> {
    //@Query(value = "SELECT p FROM Purchase p ORDER BY p.purchaseid DESC")
    public Optional<Purchase> findTopByOrderByPurchaseidDesc();
}
