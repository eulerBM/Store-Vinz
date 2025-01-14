package com.example.vinz.service;

import com.example.vinz.dtp.chat.getChatDTP;
import com.example.vinz.dtp.chat.sendChatDTP;
import com.example.vinz.dtp.chat.sendMenssage;
import com.example.vinz.entity.Chat;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.ChatRepository;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.response.ws.chatResponse;
import com.example.vinz.utils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class chatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getChat(UUID uuidUser){

        try {

            Optional<Chat> userChat = chatRepository.findByUuidUser(uuidUser);
            Optional<Users> user = userRepository.findByIdPublic(uuidUser);

            if (userChat.isPresent()) {

                Chat chat = userChat.get();

                return ResponseEntity.status(HttpStatus.OK).body(chat);

            }

            else if (user.isPresent()) {

                Users getUser = user.get();

                if (List.of(Users.ChoiceRole.ADMIN, Users.ChoiceRole.SUPER).contains(getUser.getRole())){

                    return ResponseEntity.status(HttpStatus.CONFLICT).body("ADMIN e SUPER não podem ter chat");

                }

                Chat chat = new Chat(uuidUser, getUser.getName());

                chatRepository.save(chat);

                return ResponseEntity.status(HttpStatus.OK).body(chat);

            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não possui uma conta!");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);

        }
    }

    public ResponseEntity<?> getAllChats(){

        try {

            List<Chat> getChats = chatRepository.findAll();

            if (getChats.isEmpty()){

                return ResponseEntity.notFound().build();

            }

            return ResponseEntity.ok(getChats);

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public chatResponse send(sendMenssage data){

        try {

            Optional<Chat> userChat = chatRepository.findByUuidUser(data.uuidUser());

            if (userChat.isPresent()) {

                Chat chat = userChat.get();

                Message message = new Message(data.sender(), data.message(), LocalDateTime.now());

                chat.setContent(message);

                chatRepository.save(chat);

                return new chatResponse(chat);

            }

            return new chatResponse(HttpStatus.NOT_FOUND, "Esse usuario não possui um chat aberto");

        } catch (Exception e) {

            return new chatResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.toString());

        }

    }
}