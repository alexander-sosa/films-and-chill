package bo.edu.ucb.taller.films_and_chill.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

//import bo.edu.ucb.taller.films_and_chill.dto.User;

import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.List;

@Component
public class UserDao {
    
    private DataSource dataSource;

    @Autowired
    public UserDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    public void saveUser(){
        //User user = new User();
        //String query;

        try(
            Connection connection = dataSource.getConnection();
            //PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            //ResultSet rSet = pStatement.executeQuery();
            //rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
    }
}
