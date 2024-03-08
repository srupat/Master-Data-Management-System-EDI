package com.example.Sample.SpringTest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
<<<<<<< HEAD
=======

// application.properties added to .gitignore
>>>>>>> c53f9dc2a1a2f2b3645bc9327bf16b83e66be4ad

@SpringBootApplication
public class SpringTestApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(SpringTestApplication.class, args);
	}
<<<<<<< HEAD
	
=======


>>>>>>> c53f9dc2a1a2f2b3645bc9327bf16b83e66be4ad
	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry corsRegistry){
				corsRegistry.addMapping("/**")
						.allowedMethods("*")						// allow all methods get, put, post
						.allowedOrigins("http://localhost:3000");
			}
		};
	}
<<<<<<< HEAD
	
=======




>>>>>>> c53f9dc2a1a2f2b3645bc9327bf16b83e66be4ad
}

