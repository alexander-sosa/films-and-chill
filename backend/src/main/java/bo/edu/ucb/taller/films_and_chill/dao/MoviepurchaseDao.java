package bo.edu.ucb.taller.films_and_chill.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.dto.Moviepurchase;

@Repository
public interface MoviepurchaseDao extends JpaRepository<Moviepurchase, Integer> {
    //@Query("SELECT sum(m.quantity), m.movieid FROM moviepurchase m GROUP BY m.movieid ORDER BY sum(m.quantity) DESC")
    Page<Moviepurchase> findByPurchaseidAndTuplestatus(Integer purchaseid, Boolean tuplestatus, org.springframework.data.domain.Pageable pageable);
}
