package com.example.vinz.controller.ws;

import com.example.vinz.dtp.chat.receiveMessagesDTO;
import com.example.vinz.service.chatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class chatWs {

    @Autowired
    chatService ChatService;

    @MessageMapping("chat/message/user")
    public void sendMessage(receiveMessagesDTO data){

        ChatService.sendMsg(data);

    }
}