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
        String query = "SELECT * FROM movie";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
            )
        {
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Movie movie = new Movie();
                movie.setMovie_id(rSet.getInt("movie_id"));
                movie.setTitle(rSet.getString("title"));
                movie.setDescription(rSet.getString("description"));
                movie.setRelease_year(rSet.getInt("release_year"));
                movie.setCost(rSet.getDouble("cost"));
                movie.setRating_id(rSet.getInt("rating_id"));
                movie.setGenre_id(rSet.getInt("genre_id"));
                movie.setImage_link(rSet.getString("image_link"));
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
}
