package bo.edu.ucb.taller.films_and_chill.token.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

//import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bo.edu.ucb.taller.films_and_chill.token.Config.JwtTokenUtil;
import bo.edu.ucb.taller.films_and_chill.token.Model.DAOUser;
import bo.edu.ucb.taller.films_and_chill.token.Model.JwtRequest;
import bo.edu.ucb.taller.films_and_chill.token.Model.JwtResponse;
import bo.edu.ucb.taller.films_and_chill.token.Model.RoleRequest;
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

        final DAOUser user = userDetailsService.findByUsername(authenticationRequest.getUsername());

        return ResponseEntity.ok(new JwtResponse(token, 
                                     user.getPermission_id(), 
                                     user.getName(), 
                                     user.getLastname()));
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
    public ResponseEntity<?> changeRol(@RequestBody RoleRequest user) throws Exception{
        return userDetailsService.updateRol(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/user/{user_id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody UserDTO user, @PathVariable(name = "user_id") Integer user_id) throws Exception{
        return userDetailsService.updateUser(user, user_id);
    }

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
