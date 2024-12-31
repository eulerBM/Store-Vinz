package com.example.vinz.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // Prefix pra receber...
        registry.setApplicationDestinationPrefixes("receive/");

        // Prefixs pra enviar
        registry.enableSimpleBroker("chat/");

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // Endpoint do Chat
        registry.addEndpoint("ws/chat")
                .setAllowedOrigins("http://localhost:3000")
                .withSockJS();

    }

    @Bean
    public MappingJackson2MessageConverter mappingJackson2MessageConverter() {
        return new MappingJackson2MessageConverter();
    }
}
