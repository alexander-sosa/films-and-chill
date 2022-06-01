package bo.edu.ucb.taller.films_and_chill.api;

//import bo.edu.ucb.taller.films_and_chill.dao.PurchaseDao;
//import bo.edu.ucb.taller.films_and_chill.dto.Purchase;
//import bo.edu.ucb.taller.films_and_chill.dto.PurchaseDto;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bo.edu.ucb.taller.films_and_chill.bl.PurchaseCreation;
import bo.edu.ucb.taller.films_and_chill.bl.PurchaseSearch;
import bo.edu.ucb.taller.films_and_chill.dto.PurchaseRequest;

//import java.util.List;

@RestController()
@CrossOrigin
public class PurchaseApi {
    
    private final PurchaseCreation purchaseCreation;
    private final PurchaseSearch purchaseList;

    @Autowired
    public PurchaseApi(PurchaseCreation purchaseCreation, PurchaseSearch purchaseList) {
        this.purchaseCreation = purchaseCreation;
        this.purchaseList = purchaseList;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "/purchase", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewMovie (@RequestBody PurchaseRequest purchase){
        return purchaseCreation.savePurchase(purchase);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/purchase", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPurchases(@RequestParam(defaultValue = "0") Integer page,
                                          @RequestParam(defaultValue = "20") Integer size){
        //List<Purchase> purchases = purchaseDao.findAll();
        return purchaseList.listPurchases(page, size);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/purchase/{movieid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> dataMovie(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "20") Integer size,
                                  @PathVariable(name = "movieid") Integer movieid){
        //List<Purchase> purchases = purchaseDao.findAll();
        return purchaseList.dataMovie(movieid, page, size);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/purchase/genre/{genreid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> dataGenre(@RequestParam(defaultValue = "0") Integer page,
                                       @RequestParam(defaultValue = "20") Integer size,
                                       @PathVariable(name = "genreid") Integer genreid){
        //List<Purchase> purchases = purchaseDao.findAll();
        return purchaseList.dataGenre(genreid, page, size);
    }
}
