package com.example.vinz.response.ws;

import com.example.vinz.entity.Chat;
import org.springframework.http.HttpStatus;

public class chatResponse {

    Chat chat;
    HttpStatus codeErro;
    String messageErro;

    public chatResponse(Chat chat) {
        this.chat = chat;
    }

    public chatResponse(HttpStatus codeErro, String messageErro) {
        this.codeErro = codeErro;
        this.messageErro = messageErro;
    }
}
