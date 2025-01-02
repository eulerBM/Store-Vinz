package com.example.vinz.response.ws;

import com.example.vinz.entity.Chat;
import com.example.vinz.utils.Message;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class chatResponse {

    Chat chat;
    HttpStatus codeErro;
    String messageErro;

    Message message;

    public chatResponse(Chat chat) {
        this.chat = chat;
    }

    public chatResponse(HttpStatus codeErro, String messageErro) {
        this.codeErro = codeErro;
        this.messageErro = messageErro;
    }

    public chatResponse() {
    }

    public chatResponse(Message msg) {
        this.message = msg;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public HttpStatus getCodeErro() {
        return codeErro;
    }

    public void setCodeErro(HttpStatus codeErro) {
        this.codeErro = codeErro;
    }

    public String getMessageErro() {
        return messageErro;
    }

    public void setMessageErro(String messageErro) {
        this.messageErro = messageErro;
    }
}
