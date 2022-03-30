package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/* 
	user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(30),
	lastname varchar(30),
	access_permission varchar(20),
	email varchar(60) UNIQUE,
	pass varchar(60),
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
*/
@Entity(name = "user")
public class User{
    
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer user_id;

    private String name;
    private String lastname;
    private String access_permission;
    private String email;
    private String pass;
    private Boolean tuple_status;
    private Timestamp last_update;

    public Integer getUser_id() {
        return this.user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAccess_permission() {
        return this.access_permission;
    }

    public void setAccess_permission(String access_permission) {
        this.access_permission = access_permission;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return this.pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public Boolean isTuple_status() {
        return this.tuple_status;
    }

    public Boolean getTuple_status() {
        return this.tuple_status;
    }

    public void setTuple_status(Boolean tuple_status) {
        this.tuple_status = tuple_status;
    }

    public Timestamp getLast_update() {
        return this.last_update;
    }

    public void setLast_update(Timestamp last_update) {
        this.last_update = last_update;
    }

    @Override
    public String toString() {
        return "{" +
            " user_id='" + getUser_id() + "'" +
            ", name='" + getName() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", access_permission='" + getAccess_permission() + "'" +
            ", email='" + getEmail() + "'" +
            ", pass='" + getPass() + "'" +
            ", tuple_status='" + isTuple_status() + "'" +
            ", last_update='" + getLast_update() + "'" +
            "}";
    }

}
