package bo.edu.ucb.taller.films_and_chill.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bo.edu.ucb.taller.films_and_chill.dto.Moviepurchase;

@Repository
public interface MoviepurchaseDao extends JpaRepository<Moviepurchase, Integer> {
    
}
