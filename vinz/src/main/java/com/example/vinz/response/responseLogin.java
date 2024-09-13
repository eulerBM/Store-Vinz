package com.example.vinz.response;

import com.example.vinz.entity.Users;

import java.time.LocalDateTime;
import java.util.UUID;

public record responseLogin (String acessToken,
                             Long expiresIn,
                             String name,
                             Long idPrivate,
                             UUID idPublic,
                             String email,
                             Users.ChoiceRole role,
                             LocalDateTime createAccount
                             ){

}

