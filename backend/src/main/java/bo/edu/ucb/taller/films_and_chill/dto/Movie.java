package bo.edu.ucb.taller.films_and_chill.dto;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Entity(name = "movie")
public class Movie implements Serializable{

    //Id, de la columna movie_id, generado automaticamente
    @Id
    @Column(name="movie_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer movie_id;
    
    private String title;
    private String description;
    private Integer release_year;
    private Double cost;
    private Integer rating_id;
    private String rating;
    private Integer genre_id;
    private String genre;
    private String image_link;
    private Integer stock;
    private Boolean tuple_status;
    private Timestamp last_update;

    public Movie() {
    }

    public Integer getMovie_id() {
        return this.movie_id;
    }

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
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

    public Integer getRelease_year() {
        return this.release_year;
    }

    public void setRelease_year(Integer release_year) {
        this.release_year = release_year;
    }

    public Double getCost() {
        return this.cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getRating() {
        return this.rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getImage_link() {
        return this.image_link;
    }

    public void setImage_link(String image_link) {
        this.image_link = image_link;
    }

    public Integer getStock(){
        return this.stock;
    }

    public void setStock(Integer stock){
        this.stock = stock;
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

    public Integer getRating_id() {
        return this.rating_id;
    }

    public void setRating_id(Integer rating_id) {
        this.rating_id = rating_id;
    }

    public Integer getGenre_id() {
        return this.genre_id;
    }

    public void setGenre_id(Integer genre_id) {
        this.genre_id = genre_id;
    }

}

