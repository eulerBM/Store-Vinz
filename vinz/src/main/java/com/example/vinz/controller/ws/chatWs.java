package com.example.vinz.controller;

import com.example.vinz.dtp.chat.getChatDTP;
import com.example.vinz.service.chatService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
public class chatWs {

    @Autowired
    chatService chatService;

    @MessageMapping("chat/get-chat")
    @SendTo("/chat/get-chat-response")
    public void getChat(getChatDTP data){




    }
}