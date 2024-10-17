package com.example.vinz.dtp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record productCreateDTP(

        @Size(max = 200, min = 1, message = "O nome deve ter no maximo 200 caracteres")
        @NotBlank
        String name,

        @Size(max = 500, min = 1, message = "A descrição do produto deve ter no maximo 500 caracteres")
        @NotBlank
        String description,

        @NotBlank
        Long price

) {
}
