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
        String query = "SELECT a.actor_id, " + 
                       "       a.first_name, " + 
                       "       a.last_name, " + 
                       "       a.tuple_status, " + 
                       "       a.last_update" + 
                       " FROM actor a " + 
                       " LEFT JOIN actor_movie am ON (am.actor_id = a.actor_id) " + 
                       " LEFT JOIN movie m ON (m.movie_id = am.movie_id) " + 
                       " WHERE m.movie_id = ( ? );";

        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setInt(1, movie_id);
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Actor actor = new Actor();
                actor.setActor_id(rSet.getInt("actor_id"));
                actor.setFirst_name(rSet.getString("first_name"));
                actor.setLast_name(rSet.getString("last_name"));
                actor.setTuple_status(rSet.getBoolean("tuple_status"));
                
                var lastUpdate = rSet.getTimestamp("last_update");
                actor.setLast_update(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(actor);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
}
