package com.example.vinz.controller;

import com.example.vinz.service.chatService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("chat/")
@RestController
public class chat {

    @Autowired
    chatService chatService;

    @GetMapping(path = "get/{uuidUser}", produces = "application/json")
    public ResponseEntity getChat(@PathVariable UUID uuidUser){

        return chatService.getChat(uuidUser);

    }
}