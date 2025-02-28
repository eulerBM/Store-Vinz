package com.example.vinz.service;

import com.example.vinz.dto.mailPublicProductDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class queueService {

    private static final String QUEUE_NAME = "queueStoreVinzMail";

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    // Adiciona uma mensagem à fila
    public void enqueue(mailPublicProductDto mailPublicProductDto) throws JsonProcessingException {

        String message = objectMapper.writeValueAsString(mailPublicProductDto);
        redisTemplate.opsForList().leftPush(QUEUE_NAME, message);
        System.out.println("Mensagem adicionada à fila: " + message);

    }

    // Remove e retorna a próxima mensagem da fila
    public String dequeue() {

        String message = redisTemplate.opsForList().leftPop(QUEUE_NAME);
        return message;

    }

    // Processar a fila
    @Scheduled(fixedDelay = 2000) //Espera 2 segundos antes de iniciar outra
    public void processQueue() {

        String message;
        while ((message = dequeue()) != null) {
            // Aqui você processa a mensagem
            System.out.println("Processando mensagem: " + message);

        }
    }


}
