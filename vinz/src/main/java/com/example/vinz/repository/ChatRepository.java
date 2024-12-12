package com.example.vinz.repository;

import com.example.vinz.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface ChatRepository extends MongoRepository<Chat, String> {

    Optional<Chat> findByUuidUser(UUID uuidUser);
}
