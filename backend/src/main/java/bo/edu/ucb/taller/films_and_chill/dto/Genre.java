package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
/**
 * CREATE TABLE genre(
 * genre_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
 * genre varchar(20) NOT NULL,
 * tuple_status bool DEFAULT 1,
 * last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
 */
@Entity(name = "genre")
public class Genre {
    @Id
    @Column(name = "genre_id")
    private Integer genre_id;

    private String genre;
    private Boolean tuple_status;
    private Timestamp last_update;

    public Genre() 
    {

    }

    public Integer getGenre_id() {
        return this.genre_id;
    }

    public void setGenre_id(Integer genre_id) {
        this.genre_id = genre_id;
    }

    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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
