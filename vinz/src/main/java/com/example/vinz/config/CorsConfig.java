package com.example.vinz.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Value("${backend.urls}")
    private String backendUrls;


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite todas as rotas
                        .allowedOrigins(backendUrls.split(","))
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                        .allowedHeaders("*") // Headers permitidos
                        .exposedHeaders("Authorization", "Link") // Headers expostos para o cliente
                        .allowCredentials(true) // Permitir envio de cookies
                        .maxAge(3600); // Tempo que as requisições podem ser armazenadas no cache do browser

            }
        };
    }
}
