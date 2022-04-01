package bo.edu.ucb.taller.films_and_chill.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import bo.edu.ucb.taller.films_and_chill.bl.CartManage;

import bo.edu.ucb.taller.films_and_chill.dto.Movie;

import java.util.List;

@RestController()
public class CartApi {

    CartManage cartManage;

    public CartApi(CartManage cartManage) {
        this.cartManage = cartManage;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/cart", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Movie> listAllMovies(){
        return cartManage.listCart();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path ="/cart", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String addInCart(@RequestBody Movie movie){
        return cartManage.addInCart(movie);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path ="/cart/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String removeFromCart(@PathVariable(name = "movie_id") int movie_id){
        return cartManage.removeFromCart(movie_id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path ="/cart", produces = MediaType.APPLICATION_JSON_VALUE)
    public String removeAll(){
        return cartManage.removeAll();
    }
}
