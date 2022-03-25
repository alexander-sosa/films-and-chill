package bo.edu.ucb.taller.films_and_chill;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.ApplicationContext;

//import bo.edu.ucb.taller.films_and_chill.bl.MovieSearch;

@SpringBootApplication
public class FilmsAndChillApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmsAndChillApplication.class, args);

		//ApplicationContext context = SpringApplication.run(FilmsAndChillApplication.class, args);
		//MovieSearch movieSearch = context.getBean(MovieSearch.class);
		//movieSearch.listAllMovies();
	}

}
