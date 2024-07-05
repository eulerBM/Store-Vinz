package com.example.vinz.controller;

import com.example.vinz.dtp.loginRequestDTP;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth/")
public class auth {

    @PostMapping("login")
    public ResponseEntity<loginRequestDTP> Login(@Valid @RequestBody loginRequestDTP data){

        return ResponseEntity.ok(data);

    }

    @PostMapping("register")
    public ResponseEntity<String> Register(){

        return ResponseEntity.ok().build();

    }
}
