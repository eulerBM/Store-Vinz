package com.example.vinz.response.dto;

import com.example.vinz.entity.Users;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserDTO(
        Long idPrivate,
        UUID idPublic,
        String name,
        String email,
        Users.ChoiceRole role,
        LocalDateTime createAccount
) {

}
