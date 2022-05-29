package bo.edu.ucb.taller.films_and_chill.bl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import bo.edu.ucb.taller.films_and_chill.token.Dao.UserDao;
import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;

@Service
public class PurchaseSearch {
    
    @Autowired
    private PurchaseDao purchaseDao;

    @Autowired
    private UserDao userDao;

    public ResponseEntity<?> listPurchases (Integer page, Integer size){

        Pageable pageable = PageRequest.of(page, size);

        HashMap<String, Object> result = new HashMap<String,Object>();

        Page<Purchase> purchases = purchaseDao.findByTuplestatus(true, pageable);
        //DAOUser user = userDao.findByUseridAndTuplestatus(, tuplestatus, pageable)

        result.put("purchases", purchases);

        List<DAOUser> users = new ArrayList<>();

        for(int i = 0; i < purchases.getContent().size(); i++)
            users.add(userDao.findByUseridAndTuplestatus(purchases.getContent().get(i).getUserid(), true));
        
        result.put("users", users);

        return ResponseEntity.ok(result);
    }
}
