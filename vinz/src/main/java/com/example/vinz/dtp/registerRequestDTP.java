package com.example.vinz.dtp;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record registerRequestDTP(

        @NotBlank(message = "O campo nome não pode ser branco ! ")
        @Size(min = 1, max = 150, message = "O tamanho do nome deve estar entre 1 e 150 caracteres")
        String nome,

        @NotBlank(message = "O campo email não pode ser branco ! ")
        @Size(min = 1, max = 200, message = "O tamanho do email deve estar entre 1 e 200 caracteres")
        @Email(message = "E-mail invalido")
        String email,

        @NotBlank(message = "O campo senha não pode ser branco ! ")
        @Size(min = 1, max = 300)
        String password

) {
}
