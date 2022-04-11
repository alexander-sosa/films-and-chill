package bo.edu.ucb.taller.films_and_chill.token.Model;

import java.io.Serializable;

public class JwtResponse implements Serializable{
    private static final long serialVersionUID = -8091879091924046844L;
    
    private String jwttoken;
    private Integer role_id;

    public JwtResponse() 
    {

    }

    public JwtResponse(String jwttoken, Integer role_id) {
        this.jwttoken = jwttoken;
        this.role_id = role_id;
    }

    public String getJwttoken() {
        return this.jwttoken;
    }

    public Integer getRole_id() {
        return this.role_id;
    }
}
