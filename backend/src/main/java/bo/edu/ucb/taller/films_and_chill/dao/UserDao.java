package bo.edu.ucb.taller.films_and_chill.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
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
    
    public void saveUser(User user){

        String query = " INSERT INTO user (name, lastname, access_permission, email, pass) VALUES "
                     + " ( ?, ?, ?, ?, ? ) ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setString(1, user.getName());
            pStatement.setString(2, user.getLastname());
            pStatement.setString(3, user.getAccess_permission());
            pStatement.setString(4, user.getEmail());
            pStatement.setString(5, user.getPass());
            pStatement.execute();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
    }
}
