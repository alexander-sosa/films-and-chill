package bo.edu.ucb.taller.films_and_chill;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.ApplicationContext;
/*import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;*/

//import bo.edu.ucb.taller.films_and_chill.bl.MovieSearch;

@SpringBootApplication
public class FilmsAndChillApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmsAndChillApplication.class, args);

		//ApplicationContext context = SpringApplication.run(FilmsAndChillApplication.class, args);
		//MovieSearch movieSearch = context.getBean(MovieSearch.class);
		//movieSearch.listAllMovies();
	}

	/*@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:4200");
			}
		};
	}*/

}
