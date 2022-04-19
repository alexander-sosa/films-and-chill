package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
/**
CREATE TABLE genre(
	genreid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	genre varchar(20) NOT NULL,
	imagelink varchar(255),
	tuplestatus bool DEFAULT 1,
	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
);
 */
@Entity(name = "genre")
public class Genre {
    @Id
    @Column(name = "genreid")
    private Integer genreid;

    private String genre;
    private String imagelink;
    private Boolean tuplestatus;
    private Timestamp lastupdate;

    public Genre() 
    {

    }

    public Integer getGenreid() {
        return this.genreid;
    }

    public void setGenreid(Integer genreid) {
        this.genreid = genreid;
    }

    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getImagelink() {
        return this.imagelink;
    }

    public void setImagelink(String imagelink) {
        this.imagelink = imagelink;
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
