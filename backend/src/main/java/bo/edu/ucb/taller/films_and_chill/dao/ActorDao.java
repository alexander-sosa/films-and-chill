package bo.edu.ucb.taller.films_and_chill.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.Actor;

@Component
public class ActorDao {
    
    private DataSource dataSource;

    @Autowired
    public ActorDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Actor> listByMovie(int movie_id){
        List<Actor> result = new ArrayList<>();
        String query = "SELECT a.actorid, " + 
                       "       a.firstname, " + 
                       "       a.lastname, " + 
                       "       a.tuplestatus, " + 
                       "       a.lastupdate" + 
                       " FROM actor a " + 
                       " LEFT JOIN actormovie am ON (am.actorid = a.actorid) " + 
                       " LEFT JOIN movie m ON (m.movieid = am.movieid) " + 
                       " WHERE m.movieid = ( ? );";

        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setInt(1, movie_id);
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Actor actor = new Actor();
                actor.setActorid(rSet.getInt("actorid"));
                actor.setFirstname(rSet.getString("firstname"));
                actor.setLastname(rSet.getString("lastname"));
                actor.setTuplestatus(rSet.getBoolean("tuplestatus"));
                
                var lastUpdate = rSet.getTimestamp("lastupdate");
                actor.setLastupdate(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(actor);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
}
