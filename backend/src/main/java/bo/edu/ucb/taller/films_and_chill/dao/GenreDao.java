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
}
