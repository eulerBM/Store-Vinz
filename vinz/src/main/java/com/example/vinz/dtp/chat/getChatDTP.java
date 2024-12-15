package com.example.vinz.dtp.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record getChatDTP(

        @NotBlank(message = "O campo não pode ser branco ! ")
        @Size(min = 10, max = 50, message = "O tamanho deve estar entre 10 e 50 caracteres")
        UUID uuidUser

) {
}
