package com.example.vinz.utils;

import java.time.LocalDateTime;

public class Message {

    private String msg;
    private LocalDateTime date;

    public Message(String msg, LocalDateTime date) {
        this.msg = msg;
        this.date = date;
    }

    public Message() {
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}