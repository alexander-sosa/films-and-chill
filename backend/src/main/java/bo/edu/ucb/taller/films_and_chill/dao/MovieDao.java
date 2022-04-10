package bo.edu.ucb.taller.films_and_chill.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.Movie;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

//Acceso a la DB
@Component
public class MovieDao {
    
    private DataSource dataSource;

    @Autowired
    public MovieDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Movie> listAllMovies (){
        List<Movie> result = new ArrayList<>();
        String query = " SELECT m.movie_id, " + 
                        "        m.title, " + 
                        "        m.description, " + 
                        "        m.release_year, " + 
                        "        m.cost, " + 
                        "        m.rating_id, " + 
                        "        r.rating, " +
                        "        m.genre_id, " + 
                        "        g.genre, " + 
                        "        m.image_link, " + 
                        "        m.stock, " +
                        "        m.tuple_status, " + 
                        "        m.last_update " + 
                       " FROM movie m "+ 
                       " LEFT JOIN rating r ON (r.rating_id = m.rating_id) " + 
                       " LEFT JOIN genre g ON (g.genre_id = m.genre_id)";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Movie movie = new Movie();
                movie.setMovie_id(rSet.getInt("movie_id"));
                movie.setTitle(rSet.getString("title"));
                movie.setDescription(rSet.getString("description"));
                movie.setRelease_year(rSet.getInt("release_year"));
                movie.setCost(rSet.getDouble("cost"));
                movie.setRating_id(rSet.getInt("rating_id"));
                movie.setRating(rSet.getString("rating"));
                movie.setGenre_id(rSet.getInt("genre_id"));
                movie.setGenre(rSet.getString("genre"));
                movie.setImage_link(rSet.getString("image_link"));
                movie.setStock(rSet.getInt("stock"));
                movie.setTuple_status(rSet.getBoolean("tuple_status"));

                var lastUpdate = rSet.getTimestamp("last_update");
                movie.setLast_update(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(movie);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }

    public List<Movie> findById (int movie_id){
        List<Movie> result = new ArrayList<>();
        String query = " SELECT m.movie_id, " + 
                       "        m.title, " + 
                       "        m.description, " + 
                       "        m.release_year, " + 
                       "        m.cost, " + 
                       "        m.rating_id, " + 
                       "        r.rating, " +
                       "        m.genre_id, " + 
                       "        g.genre, " + 
                       "        m.image_link, " + 
                       "        m.stock, " +
                       "        m.tuple_status, " + 
                       "        m.last_update " + 
                       " FROM movie m "+ 
                       " LEFT JOIN rating r ON (r.rating_id = m.rating_id) " + 
                       " LEFT JOIN genre g ON (g.genre_id = m.genre_id)" +
                       " WHERE m.movie_id = ( ? )";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setInt(1,  movie_id);
            
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Movie movie = new Movie();
                movie.setMovie_id(rSet.getInt("movie_id"));
                movie.setTitle(rSet.getString("title"));
                movie.setDescription(rSet.getString("description"));
                movie.setRelease_year(rSet.getInt("release_year"));
                movie.setCost(rSet.getDouble("cost"));
                movie.setRating_id(rSet.getInt("rating_id"));
                movie.setRating(rSet.getString("rating"));
                movie.setGenre_id(rSet.getInt("genre_id"));
                movie.setGenre(rSet.getString("genre"));
                movie.setImage_link(rSet.getString("image_link"));
                movie.setStock(rSet.getInt("stock"));
                movie.setTuple_status(rSet.getBoolean("tuple_status"));

                var lastUpdate = rSet.getTimestamp("last_update");
                movie.setLast_update(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(movie);
            }
            
            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }

    public void createNewMovie(Movie movie){

        String query = " INSERT INTO movie " + 
                       " (title, description, release_year, cost, stock, rating_id, genre_id, image_link) " + 
                       " VALUES " + 
                       " ( ? , ? , ? , ? , ? , ? , ? , ? ) ";

        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setString(1,  movie.getTitle());
            pStatement.setString(2,  movie.getDescription());
            pStatement.setInt(3,  movie.getRelease_year());
            pStatement.setDouble(4, movie.getCost());
            pStatement.setInt(5, movie.getStock());
            pStatement.setInt(6, movie.getRating_id());
            pStatement.setInt(7, movie.getGenre_id());
            pStatement.setString(8, movie.getImage_link());

            pStatement.execute();
            
        }catch(SQLException ex){
            ex.printStackTrace();
        }
    }
}
