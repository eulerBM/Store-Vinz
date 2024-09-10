package com.example.vinz.dtp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangeNameDTP(

        @NotBlank(message = " campo nome não pode ser branco ! ")
        @Size(min = 1, max = 150, message = "O tamanho do nome deve estar entre 1 e 150 caracteres")
        String nameNovo

) {
}
