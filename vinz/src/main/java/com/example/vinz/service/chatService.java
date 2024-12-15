package com.example.vinz.service;

import com.example.vinz.dtp.chat.getChatDTP;
import com.example.vinz.dtp.chat.sendChatDTP;
import com.example.vinz.entity.Chat;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.ChatRepository;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.utils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class chatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getChat(getChatDTP data){

        try {

            Optional<Chat> userChat = chatRepository.findByUuidUser(data.uuidUser());
            Optional<Users> user = userRepository.findByIdPublic(data.uuidUser());

            if (userChat.isPresent()) {

                return ResponseEntity.ok().body(userChat);

            }

            else if (user.isPresent()) {

                Chat chat = new Chat(data.uuidUser());

                chatRepository.save(chat);

                return ResponseEntity.ok(chat);

            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não possui um cadastro!");

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public ResponseEntity<?> send(sendChatDTP data){

        try {

            Optional<Chat> userChat = chatRepository.findByUuidUser(data.uuidUser());

            if (userChat.isPresent()) {

                Chat chat = userChat.get();

                Message message = new Message(data.sender(), data.message(), LocalDateTime.now());

                chat.setContent(message);

                chatRepository.save(chat);

                return ResponseEntity.status(HttpStatus.OK).build();

            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Esse usuario não possui um chat aberto");

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }

    }
}
