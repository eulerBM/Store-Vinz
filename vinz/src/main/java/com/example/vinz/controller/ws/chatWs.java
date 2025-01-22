package com.example.vinz.controller.ws;

import com.example.vinz.dtp.chat.receiveMessage;
import com.example.vinz.dtp.chat.sendMenssage;
import com.example.vinz.response.ws.chatResponse;
import com.example.vinz.service.chatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

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

        chatResponse chat = ChatService.send(data);

        return chat;

    }

    @MessageMapping("message/chat")
    public void sendMsg(receiveMessage data){

        ChatService.sendMsg(data);

    }
}