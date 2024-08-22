package com.example.vinz.controller;

import com.example.vinz.dtp.contactEmailRequestDTP;
import com.example.vinz.response.responseContactEmail;
import com.example.vinz.service.contactEmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("contact/")
@RestController
public class contactMy {

    @Autowired
    private contactEmailService contactEmailService;

    @PostMapping("email")
    public ResponseEntity<responseContactEmail> ContactEmail(@Valid @RequestBody contactEmailRequestDTP data){

        return contactEmailService.contactemailservice(data);
    }
}
