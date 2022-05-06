package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*
CREATE TABLE moviepurchase(
	moviepurchaseid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	movieid int NOT NULL,
	purchaseid int NOT NULL,
	quantity int NOT NULL, 
	tuplestatus bool DEFAULT 1,
	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (movieid) REFERENCES movie(movieid),
	FOREIGN KEY (purchaseid) REFERENCES purchase(purchaseid)
);
*/

@Entity
@Table(name = "moviepurchase")
public class Moviepurchase {
    @Id
    @Column(name="moviepurchaseid")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer moviepurchaseid;
    @Column
    private Integer movieid;
    @Column
    private Integer purchaseid;
    @Column
    private Integer quantity;
    @Column
    private Boolean tuplestatus;
    @Column
    private Timestamp lastupdate;

    public Moviepurchase() 
    {

    }

    public Integer getMoviepurchaseid() {
        return this.moviepurchaseid;
    }

    public void setMoviepurchaseid(Integer moviepurchaseid) {
        this.moviepurchaseid = moviepurchaseid;
    }

    public Integer getMovieid() {
        return this.movieid;
    }

    public void setMovieid(Integer movieid) {
        this.movieid = movieid;
    }

    public Integer getPurchaseid() {
        return this.purchaseid;
    }

    public void setPurchaseid(Integer purchaseid) {
        this.purchaseid = purchaseid;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
