package com.example.vinz.entity;

import com.example.vinz.utils.Message;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "chat")
public class Chat {

    @Id
    private UUID id;
    private String name;
    @Indexed(unique = true)
    private UUID uuidUser;
    private List<Message> content;

    public Chat(UUID user_uuid, String name){
        this.id = UUID.randomUUID();
        this.name = name;
        this.uuidUser = user_uuid;
        this.content = new ArrayList<>();
    }

    public Chat() {
    }

    public UUID getId() {
        return id;
    }

    public UUID getUuidUser() {
        return uuidUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Message> getContent() {
        return content;
    }

    public void setContent(Message message) {

        this.content.addLast(message);

    }
}
