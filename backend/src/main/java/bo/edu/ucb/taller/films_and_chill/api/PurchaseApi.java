package bo.edu.ucb.taller.films_and_chill.api;

import bo.edu.ucb.taller.films_and_chill.dao.PurchaseDao;
import bo.edu.ucb.taller.films_and_chill.dto.Purchase;
import bo.edu.ucb.taller.films_and_chill.dto.PurchaseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bo.edu.ucb.taller.films_and_chill.bl.PurchaseCreation;
import bo.edu.ucb.taller.films_and_chill.dto.PurchaseRequest;

import java.util.List;

@RestController()
@CrossOrigin
public class PurchaseApi {
    
    private final PurchaseCreation purchaseCreation;
    private final PurchaseDao purchaseDao;

    @Autowired
    public PurchaseApi(PurchaseCreation purchaseCreation, PurchaseDao purchaseDao) {
        this.purchaseCreation = purchaseCreation;
        this.purchaseDao = purchaseDao;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "/purchase", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewMovie (@RequestBody PurchaseRequest purchase){
        return purchaseCreation.savePurchase(purchase);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/purchase", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPurchases(){
        List<Purchase> purchases = purchaseDao.findAll();
        return new ResponseEntity<>(purchases, HttpStatus.OK);
    }
}
