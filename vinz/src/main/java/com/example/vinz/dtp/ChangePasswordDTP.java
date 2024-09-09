package com.example.vinz.dtp;

import jakarta.validation.constraints.NotBlank;

public record ChangePasswordDTP(

        @NotBlank(message = " campo Email não pode ser branco ! ")
        String Email,

        @NotBlank(message = "O campo senha Antiga não pode ser branco ! ")
        String senhaAntiga,

        @NotBlank(message = "O campo senha Nova não pode ser branco ! ")
        String senhaNova

) {
}
