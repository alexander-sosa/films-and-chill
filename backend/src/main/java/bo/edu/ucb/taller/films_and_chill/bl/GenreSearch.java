package bo.edu.ucb.taller.films_and_chill.bl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import bo.edu.ucb.taller.films_and_chill.dao.GenreDao;
import bo.edu.ucb.taller.films_and_chill.dto.Genre;

@Component
public class GenreSearch {
    private final GenreDao genreDao;

    @Autowired
    public GenreSearch(GenreDao genreDao) {
        this.genreDao = genreDao;
    }

    public ResponseEntity<?> listAllGenres(){
        return ResponseEntity.ok(genreDao.listAllGenres());
    }

    public Genre findById(Integer genreid){
        return genreDao.findById(genreid).get(0);
    }
}
