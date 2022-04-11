package bo.edu.ucb.taller.films_and_chill.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.Rating;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class RatingDao {
    
    private DataSource dataSource;

    @Autowired
    public RatingDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Rating> listAllRatings (){
        List<Rating> result = new ArrayList<>();
        String query = " SELECT rating_id, " + 
                        "       rating, " + 
                        "       tuple_status, " + 
                        "       last_update " + 
                       " FROM rating ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Rating rating = new Rating();
                rating.setRating_id(rSet.getInt("rating_id"));
                rating.setRating(rSet.getString("rating"));
                rating.setTuple_status(rSet.getBoolean("tuple_status"));

                var lastUpdate = rSet.getTimestamp("last_update");
                rating.setLast_update(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(rating);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
}
