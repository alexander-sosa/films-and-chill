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
        String query = " SELECT genre_id, " + 
                       "       genre, " + 
                       "       image_link, " + 
                       "       tuple_status, " + 
                       "       last_update " + 
                       " FROM genre g ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                Genre genre = new Genre();
                genre.setGenre_id(rSet.getInt("genre_id"));
                genre.setGenre(rSet.getString("genre"));
                genre.setImage_link(rSet.getString("image_link"));
                genre.setTuple_status(rSet.getBoolean("tuple_status"));

                var lastUpdate = rSet.getTimestamp("last_update");
                genre.setLast_update(new java.sql.Timestamp(lastUpdate.getTime()));
                result.add(genre);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
        return result;
    }
}
