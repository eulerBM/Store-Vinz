package com.example.vinz.dtp;

import jakarta.validation.constraints.Size;

public record productEditeDTP(

        @Size(max = 200, message = "O nome deve ter no maximo 200 caracteres")
        String nomeProduto,

        @Size(max = 500, message = "A descrição do produto deve ter no maximo 500 caracteres")
        String descriçãoProduto

) {
}
