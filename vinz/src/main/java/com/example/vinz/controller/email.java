package com.example.vinz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vinz.service.emailService;

@RestController
@RequestMapping("email/")
public class email {

    @Autowired
    emailService emailService;

    @PostMapping(path = "change/password")
    public void changePassword(){

        emailService.changePasswordService("enzelo@gmail.com", "Senh alterada com sucesso", "sua senha fo ialterada!");

    }
}
