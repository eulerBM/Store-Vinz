package com.example.vinz.dtp.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record sendChatDTP(

        @NotBlank(message = "O campo sender não pode ser branco ! ")
        @Pattern(regexp = "ADMIN|USER", message = "O sender da conta deve ser 'ADMIN' ou 'USER'")
        String sender,

        @NotBlank(message = "O campo message não pode ser branco ! ")
        @Size(max = 1000, message = "O tamanho do email deve estar entre 1 e 200 caracteres")
        String message,

        @NotBlank(message = "O campo uuidUser não pode ser branco ! ")
        @Size(min = 10, max = 50, message = "O tamanho deve estar entre 10 e 50 caracteres")
        UUID uuidUser

) {
}