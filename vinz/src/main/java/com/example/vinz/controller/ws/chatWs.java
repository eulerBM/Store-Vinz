package com.example.vinz.controller;

import com.example.vinz.dtp.chat.sendMenssage;
import com.example.vinz.response.ws.chatResponse;
import com.example.vinz.service.chatService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
public class chatWs {

    @Autowired
    chatService ChatService;

    @MessageMapping("chat/message")
    @SendTo("chat/message")
    public chatResponse sendMessage(sendMenssage data){

        System.out.println(data);

        chatResponse chat = ChatService.send(data);

        System.out.println(chat);

        return chat;

    }
}