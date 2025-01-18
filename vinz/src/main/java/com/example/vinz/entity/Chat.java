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
    private String lastMsg;
    private List<Message> content;

    public Chat(UUID user_uuid, String name){
        this.id = UUID.randomUUID();
        this.name = name;
        this.uuidUser = user_uuid;
        this.content = new ArrayList<>();
    }

    public Chat() {
    }

    public String getLastMsg() {
        return lastMsg;
    }

    public void setLastMsg(String lastMsg) {
        this.lastMsg = lastMsg;
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
