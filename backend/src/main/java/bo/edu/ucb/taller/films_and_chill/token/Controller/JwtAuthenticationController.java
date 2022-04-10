package bo.edu.ucb.taller.films_and_chill.token.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

//import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.token.Config.JwtTokenUtil;
import bo.edu.ucb.taller.films_and_chill.token.Model.JwtRequest;
import bo.edu.ucb.taller.films_and_chill.token.Model.JwtResponse;
import bo.edu.ucb.taller.films_and_chill.token.Model.UserDTO;
import bo.edu.ucb.taller.films_and_chill.token.Service.JWTUserDetailsService;
import io.jsonwebtoken.impl.DefaultClaims;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JWTUserDetailsService userDetailsService;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception{
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                                        .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception{
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<?> listAll() throws Exception{
        return ResponseEntity.ok(userDetailsService.listAll());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/user/permission", method = RequestMethod.PUT)
    public ResponseEntity<?> changeRol(@RequestBody UserDTO user) throws Exception{
        if(user.getAccess_permission() == null || user.getEmail() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos Inválidos");
        if(!user.getAccess_permission().equals("admin"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso Denegado");
        return ResponseEntity.ok(userDetailsService.updateRol(user));
    }

    /*@CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/refreshtoken", method = RequestMethod.GET)
	public ResponseEntity<?> refreshtoken(HttpServletRequest request) throws Exception {
		DefaultClaims claims = (io.jsonwebtoken.impl.DefaultClaims) request.getAttribute("claims");
		Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
		String token = jwtTokenUtil.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());
		return ResponseEntity.ok(new JwtResponse(token));
	}*/

    private void authenticate (String username, String password) throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch(DisabledException e){
            throw new Exception("USER_DISABLED", e);
        } catch(BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
		Map<String, Object> expectedMap = new HashMap<String, Object>();
		for (Entry<String, Object> entry : claims.entrySet()) {
			expectedMap.put(entry.getKey(), entry.getValue());
		}
		return expectedMap;
	}
}
