package bo.edu.ucb.taller.films_and_chill.bl;

//import org.springframework.http.HttpStatus;

//import java.sql.Timestamp;
//import java.util.Optional;
//import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.*;

//import bo.edu.ucb.taller.films_and_chill.dao.MoviepurchaseDao;
import bo.edu.ucb.taller.films_and_chill.dao.PurchaseDao;
//import bo.edu.ucb.taller.films_and_chill.dto.Moviepurchase;
import bo.edu.ucb.taller.films_and_chill.dto.Purchase;
//import bo.edu.ucb.taller.films_and_chill.dto.PurchaseRequest;

@Service
public class PurchaseList {
    
    @Autowired
    private PurchaseDao purchaseDao;

    public ResponseEntity<?> listPurchases (Integer page, Integer size){

        Pageable pageable = PageRequest.of(page, size);

        Page<Purchase> purchases = purchaseDao.findByTuplestatus(true, pageable);
        
        return ResponseEntity.ok(purchases);
    }
}
