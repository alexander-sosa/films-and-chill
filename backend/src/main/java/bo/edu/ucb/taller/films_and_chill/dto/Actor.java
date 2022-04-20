package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/*
CREATE TABLE actor (
    actorid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname varchar(20) NOT NULL,
    lastname varchar(20) NOT NULL,
	tuplestatus bool DEFAULT 1,
    lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

@Entity(name = "actor")
public class Actor {
    
    @Id
    @Column(name = "actorid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer actorid;

    private String firstname;
    private String lastname;
    private Boolean tuplestatus;
    private Timestamp lastupdate;

    public Actor() {
    }

    public Integer getActorid() {
        return this.actorid;
    }

    public void setActorid(Integer actorid) {
        this.actorid = actorid;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Boolean isTuplestatus() {
        return this.tuplestatus;
    }

    public Boolean getTuplestatus() {
        return this.tuplestatus;
    }

    public void setTuplestatus(Boolean tuplestatus) {
        this.tuplestatus = tuplestatus;
    }

    public Timestamp getLastupdate() {
        return this.lastupdate;
    }

    public void setLastupdate(Timestamp lastupdate) {
        this.lastupdate = lastupdate;
    }
}
