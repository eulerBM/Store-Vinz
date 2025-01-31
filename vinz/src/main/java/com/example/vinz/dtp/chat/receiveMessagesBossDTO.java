package com.example.vinz.dtp.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.UUID;

public record receiveMessagesBossDTO(

        @NotBlank(message = "O campo Nome não pode ser branco ! ")
        @Size(min = 1, max = 100)
        String nome,

        @NotBlank(message = "O campo senderIdPublic não pode ser branco ! ")
        @Size(min = 10, max = 50)
        UUID senderIdPublicUser,

        @NotBlank(message = "O campo senderIdPublicBoss não pode ser branco ! ")
        @Size(min = 10, max = 50)
        UUID senderIdPublicBoss,

        @NotBlank(message = "O campo Role não pode ser branco ! ")
        @Pattern(regexp = "USER|ADMIN|SUPER", message = "O role da conta deve ser 'SUPER', 'ADMIN' e 'USER'")
        String role,

        @NotBlank(message = "O campo Message não pode ser branco ! ")
        @Size(max = 1000, message = "O tamanho da message deve ter 1000 caracteres ou menos ! ")
        String message,

        @NotBlank(message = "O campo Timestamp não pode ser branco ! ")
        LocalDateTime timestamp
) {
}
