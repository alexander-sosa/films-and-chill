package bo.edu.ucb.taller.films_and_chill.dao;

import javax.sql.DataSource;

import com.google.common.hash.Hashing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dto.User;

import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserDao {
    
    private DataSource dataSource;

    @Autowired
    public UserDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    public void saveUser(User user){

        String query = " INSERT INTO user (name, lastname, permission_id, email, pass) VALUES "
                     + " ( ?, ?, ?, ?, ? ) ";
        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            String pwd = Hashing.sha256()
                         .hashString(user.getPass(), StandardCharsets.UTF_8)
                         .toString();

            pStatement.setString(1, user.getName());
            pStatement.setString(2, user.getLastname());
            pStatement.setInt(3, user.getPermission_id());
            pStatement.setString(4, user.getEmail());
            pStatement.setString(5, pwd);
            pStatement.execute();
        }catch(SQLException ex){
            ex.printStackTrace();
        }
    }

    public List<User> logIn(String email, String pass){

        List<User> result = new ArrayList<>();

        String query = " SELECT u.user_id, " + 
                       "        u.name, " + 
                       "        u.lastname, " + 
                       "        p.permission_id, " + 
                       "        p.description, " + 
                       "        u.email, " + 
                       "        u.tuple_status, " +
                       "        u.last_update " + 
                       " FROM user u " + 
                       " LEFT JOIN permission p ON (p.permission_id = u.permission_id) " + 
                       " WHERE pass = ( ? ) " + 
                       " AND email = ( ? ) ";

        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            String pwd = Hashing.sha256()
                         .hashString(pass, StandardCharsets.UTF_8)
                         .toString();

            pStatement.setString(1, pwd);
            pStatement.setString(2, email);
            
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                User user = new User();
                user.setUser_id(rSet.getInt("user_id"));
                user.setName(rSet.getString("name"));
                user.setLastname(rSet.getString("lastname"));
                user.setPermission_id(rSet.getInt("permission_id"));
                user.setAccess_permission(rSet.getString("description"));
                user.setEmail(rSet.getString("email"));
                user.setTuple_status(rSet.getBoolean("tuple_status"));

                var lastUpdate = rSet.getTimestamp("last_update");
                user.setLast_update(new java.sql.Timestamp(lastUpdate.getTime()));

                result.add(user);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }

        return result;
    }

    public void setRol(int user_id, String access_permission){
        //System.out.println(access_permission);

        String query;

        if(access_permission.equals("admin")){
            query = " UPDATE user " + 
                    " SET permission_id = 1 " + 
                    " WHERE user_id = ( ? ) ";
        }else {
            query = " UPDATE user " + 
                    " SET permission_id = 2 " + 
                    " WHERE user_id = ( ? ) ";
        }

        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){
            pStatement.setInt(1, user_id);
            pStatement.execute();
            
        }catch(SQLException ex){
            ex.printStackTrace();
        }
    }

    public List<User> ListUsers(){

        List<User> result = new ArrayList<>();

        String query = " SELECT u.user_id, " + 
                       "        u.name, " + 
                       "        u.lastname, " + 
                       "        p.description, " + 
                       "        u.email " + 
                       " FROM user u " + 
                       " LEFT JOIN permission p ON (p.permission_id = u.permission_id) "; 

        try(
            Connection connection = dataSource.getConnection();
            PreparedStatement pStatement = connection.prepareStatement(query);
        ){            
            ResultSet rSet = pStatement.executeQuery();

            while(rSet.next()){
                User user = new User();
                user.setUser_id(rSet.getInt("user_id"));
                user.setName(rSet.getString("name"));
                user.setLastname(rSet.getString("lastname"));
                user.setAccess_permission(rSet.getString("description"));
                user.setEmail(rSet.getString("email"));
                result.add(user);
            }

            rSet.close();
        }catch(SQLException ex){
            ex.printStackTrace();
        }

        return result;
    }
}
