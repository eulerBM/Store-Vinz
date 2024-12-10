package com.example.vinz.controller;

import com.example.vinz.entity.Chat;
import com.example.vinz.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("chat/")
public class chat {

    @Autowired
    private ChatRepository chatRepository;

    @PostMapping(path = "create")
    public ResponseEntity<?> CreateChat(@RequestBody UUID user_uuid){

        Chat chat = new Chat(user_uuid);

        chatRepository.save(chat);

        return ResponseEntity.ok().build();

    }
}
