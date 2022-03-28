package bo.edu.ucb.taller.films_and_chill.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "user")
public class User {
    
    @Id
    @Column(name="movie_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer movie_id;
}
