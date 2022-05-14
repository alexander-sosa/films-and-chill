package bo.edu.ucb.taller.films_and_chill.bl;

import java.util.HashMap;

//import java.util.HashMap;
//import java.util.Map;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
//import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import bo.edu.ucb.taller.films_and_chill.dao.MovieDao;
import bo.edu.ucb.taller.films_and_chill.dto.Genre;
//import bo.edu.ucb.taller.films_and_chill.dto.Movie;
//import bo.edu.ucb.taller.films_and_chill.exception.DatabaseException;
import bo.edu.ucb.taller.films_and_chill.dto.Movie;
import bo.edu.ucb.taller.films_and_chill.dto.Rating;

//SOLO BUSQUEDA DE PELICULAS
/*@Service
public class MovieSearch{}*/
@Service
public class MovieSearch {
    
    @Autowired
    private MovieDao movieDao;

    @Autowired
    private GenreSearch genreSearch;

    @Autowired
    private RatingSearch ratingSearch;
    /*@Autowired
    public MovieSearch(MovieDao movieDao) {
        this.movieDao = movieDao;
    }*/

    public ResponseEntity<?> listAllMovies(Integer genreId, String search, Integer page, Integer size){
        //PageRequest pageable = PageRequest.of(page, 40, Sort.by("movie_id"));
        //Page<Movie> movies = movieDao.findAll(pageable);
        //if(page != null)
        //return ResponseEntity.ok(movies);
            //return ResponseEntity.ok(movieDao.listAllMovies(page, page + 40));
        /*if(genre_id != null)
            return listAllMoviesByGenre(genre_id, page);
        return ResponseEntity.ok(movieDao.listAllMovies(1, 40));*/
        //PageRequest pageable = PageRequest.of(page, size);
        //System.out.println(title);
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = null;

        if(genreId == null && search == null)
            movies = movieDao.findByTuplestatus(true, pageable);
        else if (search == null)
            movies = movieDao.findByGenreidAndTuplestatus(genreId, true, pageable);
        else{
            //movies = movieDao.findByTitleAndTuplestatus(title, true, pageable);

            HashMap<String, Object> result = new HashMap<String,Object>();

            Page<Movie> moviesByTitle = findByTitle(search, page, size);
            result.put("byTitle", moviesByTitle);

            Page<Movie> moviesByName = findByName(search, page, size);
            result.put("byName", moviesByName);

            return ResponseEntity.ok(result);
        }

        return ResponseEntity.ok(movies);
    }

    public ResponseEntity<?> findById(int movie_id){
        if(movieDao.findById(movie_id).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
        }
        
        Movie movie = movieDao.findById(movie_id).get();

        Genre genre = genreSearch.findById(movie.getGenreid());
        movie.setGenre(genre.getGenre());

        Rating rating = ratingSearch.findById(movie.getRatingid());
        movie.setRating(rating.getRating());

        return ResponseEntity.ok(movieDao.findById(movie_id));
    }

    public ResponseEntity<?> findByReleaseYear(Integer page, Integer size){
        //findByTuplestatusOrderByReleaseyear
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "releaseyear"));
        Page<Movie> movies = movieDao.findAll(pageable);

        return ResponseEntity.ok(movies);
    }

    public Page<Movie> findByTitle(String title, Integer page, Integer size){
        title = "%" + title.toLowerCase() + "%";
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = movieDao.findByTitleAndTuplestatus(title, true, pageable);

        return movies;
    }

    public Page<Movie> findByName(String name, Integer page, Integer size){

        
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = null;

        if(name.contains(" ")){
            String fname = name.substring(0, name.indexOf(" "));
            String lname = name.substring(name.indexOf(" ") + 1, name.length());

            fname = "%" + fname.toLowerCase() + "%";
            lname = "%" + lname.toLowerCase() + "%";
            
            movies = movieDao.findByFirstnameAndLastnameAndTuplestatus(fname, lname, true, pageable);
            
            return movies;
        }

        name = "%" + name.toLowerCase() + "%";
        movies = movieDao.findByNameAndTuplestatus(name, true, pageable);

        return movies;
    }

    public ResponseEntity<?> findByPopular(Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = movieDao.findByQuantityAndTuplestatusDesc(true, pageable);

        return ResponseEntity.ok(movies);
    }

    /*public ResponseEntity<?> listAllMoviesByGenre(Integer genre_id, Integer from){
        if(from != null)
            return ResponseEntity.ok(movieDao.listAllMoviesByGenre(genre_id, from));

        return ResponseEntity.ok(movieDao.listAllMoviesByGenre(genre_id, 1));
    }*/
}
