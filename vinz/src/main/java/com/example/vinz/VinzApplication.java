package com.example.vinz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VinzApplication {

	public static void main(String[] args) {
		SpringApplication.run(VinzApplication.class, args);
	}

}
