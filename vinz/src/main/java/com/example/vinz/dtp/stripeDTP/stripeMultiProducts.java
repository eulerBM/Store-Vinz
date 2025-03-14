package com.example.vinz.dtp.stripeDTP;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record stripeMultiProducts(

        @Size(max = 200, min = 1, message = "O nome deve ter no maximo 200 caracteres")
        @NotBlank
        String name,

        @Size(max = 500, min = 1, message = "A descrição do produto deve ter no maximo 500 caracteres")
        @NotBlank
        String description,

        @NotBlank(message = "O preço deve ser informado")
        Long amount

) {
}
