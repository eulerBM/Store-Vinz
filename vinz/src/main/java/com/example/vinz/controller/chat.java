package com.example.vinz.controller;

import com.example.vinz.dtp.chat.getChatDTP;
import com.example.vinz.dtp.chat.sendChatDTP;
import com.example.vinz.service.chatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("chat/")
public class chat {

    @Autowired
    chatService chatService;

    @PostMapping(path = "get", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> getChat(@Valid @RequestBody getChatDTP data){

        return chatService.getChat(data);

    }

    @PostMapping(path = "send", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> send(@Valid @RequestBody sendChatDTP data){

        return chatService.send(data);

    }
}
