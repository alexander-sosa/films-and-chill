package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/*
CREATE TABLE rating(
	ratingid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	rating varchar(10) NOT NULL,
	tuplestatus bool DEFAULT 1,
	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
*/
@Entity(name = "rating")
public class Rating {

    @Id
    @Column(name = "ratingid")
    private Integer ratingid;

    private String rating;
    private Boolean tuplestatus;
    private Timestamp lastupdate;

    public Rating() 
    {

    }

    public Integer getRatingid() {
        return this.ratingid;
    }

    public void setRatinid(Integer ratingid) {
        this.ratingid = ratingid;
    }

    public String getRating() {
        return this.rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
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
