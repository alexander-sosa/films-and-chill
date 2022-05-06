package bo.edu.ucb.taller.films_and_chill.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.bl.PurchaseCreation;
import bo.edu.ucb.taller.films_and_chill.dto.PurchaseRequest;

@RestController()
@CrossOrigin
public class PurchaseApi {
    
    @Autowired
    private PurchaseCreation purchaseCreation;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "/purchase", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewMovie (@RequestBody PurchaseRequest purchase){
        return purchaseCreation.savePurchase(purchase);
    }
}
