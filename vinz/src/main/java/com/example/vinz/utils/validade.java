package com.example.vinz.utils;

import org.springframework.http.ResponseEntity;

public class validade {

    public static void passworldIsIquals(String password, String password2){

        if (!password.equals(password2)){

            throw new IllegalArgumentException("As senhas são diferentes!");

        }
    }
}
