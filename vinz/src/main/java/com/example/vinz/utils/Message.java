package com.example.vinz.utils;

import java.time.LocalDateTime;

public class Message {

    private String sender;
    private String msg;
    private LocalDateTime date;
    private String role;
    private Boolean look;

    public Message(String sender, String msg, LocalDateTime date, String role) {
        this.sender = sender;
        this.msg = msg;
        this.date = date;
        this.role = role;
        this.look = false;
    }

    public Message() {
    }

    public String getSender() {
        return sender;
    }

    public String getMsg() {
        return msg;
    }

    public LocalDateTime getDate() {
        return date;
    }
}