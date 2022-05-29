package bo.edu.ucb.taller.films_and_chill.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.Genre;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class GenreDao {
    
    private DataSource dataSource;

    @Autowired
    public GenreDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    public List<Genre> listAllGenres (){
        List<Genre> result = new ArrayList<>();
        String query = " SELECT genreid, " + 
                       "       genre, " + 
                       "       imagelink, " + 
                       "       tuplestatus, " + 
                       "       lastupdate " + 
                       " FROM genre g ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Genre genre = new Genre();
                genre.setGenreid(rSet.getInt("genreid"));
                genre.setGenre(rSet.getString("genre"));
                genre.setImagelink(rSet.getString("imagelink"));
                genre.setTuplestatus(rSet.getBoolean("tuplestatus"));

                var lastUpdate = rSet.getTimestamp("lastupdate");
                genre.setLastupdate(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(genre);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }

    public List<Genre> findById(Integer genreid){
        List<Genre> result = new ArrayList<>();
        String query = " SELECT genreid, " + 
                       "       genre, " + 
                       "       imagelink, " + 
                       "       tuplestatus, " + 
                       "       lastupdate " + 
                       " FROM genre g " + 
                       " WHERE genreid = ? ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setInt(1, genreid);
            
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Genre genre = new Genre();
                genre.setGenreid(rSet.getInt("genreid"));
                genre.setGenre(rSet.getString("genre"));
                genre.setImagelink(rSet.getString("imagelink"));
                genre.setTuplestatus(rSet.getBoolean("tuplestatus"));

                var lastUpdate = rSet.getTimestamp("lastupdate");
                genre.setLastupdate(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(genre);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
/**
 * SELECT count(*) as purchases_nbr, g.genreid, g.genre
FROM moviepurchase mp
LEFT JOIN movie m ON mp.movieid = m.movieid
LEFT JOIN genre g ON m.genreid = g.genreid
GROUP BY genreid 
ORDER BY count(*) DESC
LIMIT 12;
 */
    public List<HashMap<String, Object>> mostSold(){
        List<HashMap<String, Object>> result = new ArrayList<>();
        String query = " SELECT count(*) as purchases_nbr, " + 
                       "        g.genreid, " + 
                       "        g.genre, " +  
                       "        g.imagelink, " + 
                       "        g.tuplestatus, " + 
                       "        g.lastupdate " +
                       " FROM moviepurchase mp " +
                       " LEFT JOIN movie m ON mp.movieid = m.movieid " +
                       " LEFT JOIN genre g ON m.genreid = g.genreid " + 
                       " GROUP BY genreid " +
                       " ORDER BY count(*) DESC " +
                       " LIMIT 12 ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                HashMap<String, Object> map = new HashMap<>();
                String purchases_nbr = rSet.getString("purchases_nbr");

                map.put("purchases_nbr", purchases_nbr);

                Genre genre = new Genre();
                genre.setGenreid(rSet.getInt("genreid"));
                genre.setGenre(rSet.getString("genre"));
                genre.setImagelink(rSet.getString("imagelink"));
                genre.setTuplestatus(rSet.getBoolean("tuplestatus"));

                var lastUpdate = rSet.getTimestamp("lastupdate");
                genre.setLastupdate(new java.sql.Timestamp(lastUpdate.getTime()));

                map.put("genre", genre);

                result.add(map);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
}
