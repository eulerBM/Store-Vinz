package com.example.vinz.dtp.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record sendMenssage(

        @NotBlank(message = "O campo sender não pode ser branco ! ")
        @Pattern(regexp = "ADMIN|USER|SUPER", message = "O sender da conta deve ser 'ADMIN', 'USER' ou 'SUPER'")
        String sender,

        @NotBlank(message = "O campo message não pode ser branco ! ")
        @Size(max = 1000, message = "O tamanho maximo da message 1000 caracteres")
        String message,

        @NotBlank(message = "O campo uuidUser não pode ser branco ! ")
        @Size(min = 10, max = 50, message = "O tamanho deve estar entre 10 e 50 caracteres")
        UUID uuidUser

) {
}
