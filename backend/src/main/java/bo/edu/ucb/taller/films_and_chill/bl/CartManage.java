package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.stereotype.Component;
import java.util.List;

import bo.edu.ucb.taller.films_and_chill.dao.CartDao;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@Component
public class CartManage {

    private final CartDao cartDao;

    public CartManage(CartDao cartDao) {
        this.cartDao = cartDao;
    }

    public List<Movie> listCart(){
        return this.cartDao.listCart();
    }

    public String addInCart(Movie movie){
        this.cartDao.addInCart(movie);
        return "Guardado exitoso";
    }

    public String removeFromCart(Integer movie_id){
        this.cartDao.removeFromCart(movie_id);
        return "Borrado exitoso";
    }

    public String removeAll(){
        this.cartDao.removeAll();
        return "Borrado exitoso";
    }
}
