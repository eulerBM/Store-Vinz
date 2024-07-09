package com.example.vinz.dtp;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record contactEmailRequestDTP(

        @NotBlank(message = "O campo email não pode ser branco ! ")
        @Size(min = 1, max = 200, message = "O tamanho do email deve estar entre 1 e 200 caracteres")
        @Email(message = "E-mail invalido")
        String email

) {
}
