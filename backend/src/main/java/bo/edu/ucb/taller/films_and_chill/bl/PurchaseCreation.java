package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bo.edu.ucb.taller.films_and_chill.dao.MoviepurchaseDao;
import bo.edu.ucb.taller.films_and_chill.dao.PurchaseDao;
import bo.edu.ucb.taller.films_and_chill.dto.Moviepurchase;
import bo.edu.ucb.taller.films_and_chill.dto.Purchase;
import bo.edu.ucb.taller.films_and_chill.dto.PurchaseRequest;

@Service
public class PurchaseCreation {
    
    @Autowired
    private PurchaseDao purchaseDao;

    @Autowired
    private MoviepurchaseDao moviepurchaseDao;

    public ResponseEntity<?> savePurchase (PurchaseRequest request){

        Purchase purchase = new Purchase();
        purchase.setUserid(request.getUserid());
        purchase.setTotalcost(request.getTotalcost());
        purchase.setAddress(request.getAddress());
        purchase.setPurchasedate(new Timestamp(System.currentTimeMillis()));
        purchase.setLastupdate(new Timestamp(System.currentTimeMillis()));
        purchase.setTuplestatus(true);

        purchaseDao.save(purchase);

        Optional<Purchase> purchases = purchaseDao.findTopByOrderByPurchaseidDesc();
        //System.out.println(request);

        Moviepurchase mp = new Moviepurchase();
        mp.setMovieid(request.getMovieid());
        mp.setPurchaseid(purchases.get().getPurchaseid());
        mp.setQuantity(request.getQuantity());
        mp.setLastupdate(new Timestamp(System.currentTimeMillis()));
        mp.setTuplestatus(true);

        moviepurchaseDao.save(mp);

        return ResponseEntity.status(HttpStatus.CREATED).body("Compra guardada");
        //return ResponseEntity.status(HttpStatus.CREATED).body(purchaseDao.save(purchase));
    }
}
