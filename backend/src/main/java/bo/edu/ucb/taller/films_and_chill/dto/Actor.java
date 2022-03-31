package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/*
CREATE TABLE actor (
    actor_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

@Entity(name = "actor")
public class Actor {
    
    @Id
    @Column(name = "actor_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer actor_id;

    private String first_name;
    private String last_name;
    private Boolean tuple_status;
    private Timestamp last_update;

    public Integer getActor_id() {
        return this.actor_id;
    }

    public void setActor_id(Integer actor_id) {
        this.actor_id = actor_id;
    }

    public String getFirst_name() {
        return this.first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return this.last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
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
}
