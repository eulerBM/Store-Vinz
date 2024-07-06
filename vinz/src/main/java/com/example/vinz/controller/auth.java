package com.example.vinz.controller;

import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.dtp.registerRequestDTP;
import com.example.vinz.response.responseLogin;
import com.example.vinz.service.loginService;
import com.example.vinz.service.registerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth/")
public class auth {

    @Autowired
    private loginService loginservice;

    @Autowired
    private registerService registerservice;

    @PostMapping("login")
    public ResponseEntity<responseLogin> Login(@Valid @RequestBody loginRequestDTP data){

        return loginservice.LoginService(data);

    }

    @PostMapping("register")
    public ResponseEntity<?> Register(@Valid @RequestBody registerRequestDTP data){

        return registerservice.registerService(data);

    }
}
