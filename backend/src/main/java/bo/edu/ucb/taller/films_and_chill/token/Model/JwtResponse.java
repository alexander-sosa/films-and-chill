package bo.edu.ucb.taller.films_and_chill.token.Model;

import java.io.Serializable;

public class JwtResponse implements Serializable{
    private static final long serialVersionUID = -8091879091924046844L;
    
    private String jwttoken;
    private Integer role_id;
    private String name;
    private String lastname;

    public JwtResponse() 
    {

    }

    public JwtResponse(String jwttoken, Integer role_id) {
        this.jwttoken = jwttoken;
        this.role_id = role_id;
    }

    public JwtResponse(String jwttoken, Integer role_id, String name, String lastname) {
        this.jwttoken = jwttoken;
        this.role_id = role_id;
        this.name = name;
        this.lastname = lastname;
    }

    public String getJwttoken() {
        return this.jwttoken;
    }

    public Integer getRole_id() {
        return this.role_id;
    }

    public void setJwttoken(String jwttoken) {
        this.jwttoken = jwttoken;
    }
    public void setRole_id(Integer role_id) {
        this.role_id = role_id;
    }

    public String getName() {
        return this.name;
    }

    public String getLastname() {
        return this.lastname;
    }
}
