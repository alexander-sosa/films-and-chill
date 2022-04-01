package bo.edu.ucb.taller.films_and_chill.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.Movie;

@Component
public class CartDao {
    List<Movie> cart = new ArrayList<>();

    public List<Movie> listCart(){
        System.out.println(cart);
        return cart;
    }

    public void addInCart(Movie movie){
        cart.add(movie);
    }

    public void removeFromCart(Integer movie_id){

        List<Integer> movie_ids = new ArrayList<>();

        for(int i = 0; i < this.cart.size(); i++){
            movie_ids.add(this.cart.get(i).getMovie_id());
        }

        int index = movie_ids.indexOf(movie_id);

        if(index > -1){
            cart.remove(index);
        }
    }

    public void removeAll(){
        this.cart.clear();
    }
}
