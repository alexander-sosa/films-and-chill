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
        String query = " SELECT ratingid, " + 
                        "       rating, " + 
                        "       tuplestatus, " + 
                        "       lastupdate " + 
                       " FROM rating ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Rating rating = new Rating();
                rating.setRatinid(rSet.getInt("ratingid"));
                rating.setRating(rSet.getString("rating"));
                rating.setTuplestatus(rSet.getBoolean("tuplestatus"));

                var lastUpdate = rSet.getTimestamp("lastupdate");
                rating.setLastupdate(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(rating);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
}
