package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/*
CREATE TABLE movie (
    movie_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description text,
    release_year int,
    cost double(5,2) NOT NULL,
	rating_id int NOT NULL,
	genre_id int NOT NULL,
	image_link varchar(200),
	tuple_status bool DEFAULT 1,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rating_id) REFERENCES rating(rating_id),
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);
*/
@Entity
@Table(name = "movie")
public class Movie {

    //Id, de la columna movie_id, generado automaticamente
    @Id
    @Column(name="movieid")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer movieid;
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private Integer releaseyear;
    @Column
    private Double cost;
    @Column
    private Integer ratingid;
    private String rating;
    @Column
    private Integer genreid;
    private String genre;
    @Column
    private String imagelink;
    @Column
    private Integer stock;
    @Column
    private Boolean tuplestatus;
    @Column
    private Timestamp lastupdate;

    public Movie() 
    {
        
    }

    public Integer getMovieid() {
        return this.movieid;
    }

    public void setMovieid(Integer movieid) {
        this.movieid = movieid;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getReleaseyear() {
        return this.releaseyear;
    }

    public void setReleaseyear(Integer releaseyear) {
        this.releaseyear = releaseyear;
    }

    public Double getCost() {
        return this.cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Integer getRatingid() {
        return this.ratingid;
    }

    public void setRatingid(Integer ratingid) {
        this.ratingid = ratingid;
    }

    public String getRating() {
        return this.rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
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

    public Integer getStock() {
        return this.stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
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

