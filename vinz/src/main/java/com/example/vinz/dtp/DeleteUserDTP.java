package com.example.vinz.dtp;

import jakarta.validation.constraints.Size;

public record DeleteUserDTP(

        @Size(max = 500, min = 1)
        String content

) {
}
