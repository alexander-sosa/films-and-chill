package bo.edu.ucb.taller.films_and_chill.token.Model;

import java.io.Serializable;

public class JwtResponse implements Serializable{
    private static final long serialVersionUID = -8091879091924046844L;
    private String jwttoken;

    public JwtResponse() 
    {

    }

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getJwttoken() {
        return this.jwttoken;
    }
}
