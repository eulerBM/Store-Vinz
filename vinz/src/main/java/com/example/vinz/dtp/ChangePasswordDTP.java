package com.example.vinz.dtp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ChangePasswordDTP(

        @NotBlank(message = "O campo senha Antiga não pode ser branco ! ")
        @Size(min = 5, max = 100, message = "O tamanho do email deve estar entre 8 e 200 caracteres")
        String senhaAntiga,

        @NotBlank(message = "O campo senha Nova não pode ser branco ! ")
        @Size(min = 5, max = 100, message = "O tamanho do email deve estar entre 8 e 200 caracteres")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).+$",
        message = "A senha deve conter pelo menos uma letra, um número e um caractere especial")
        String senhaNova

) {
}
