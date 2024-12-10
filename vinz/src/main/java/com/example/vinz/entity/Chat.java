package com.example.vinz.entity;

import com.example.vinz.utils.Message;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "chat")
public class Chat {

    @Id
    private String id;
    private UUID user_uuid;
    private List<Message> content = new ArrayList<>();

    public Chat(UUID user_uuid){
        this.user_uuid = user_uuid;
        this.content = new ArrayList<>();

    }

    public Chat() {
    }

    public String getId() {
        return id;
    }

    public UUID getUser_uuid() {
        return user_uuid;
    }

    public List<Message> getContent() {
        return content;
    }

    public void setContent(List<Message> content) {
        this.content = content;
    }
}
