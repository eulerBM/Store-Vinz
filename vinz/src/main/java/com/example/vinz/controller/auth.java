package com.example.vinz.controller;

import com.example.vinz.dtp.ChangeNameDTP;
import com.example.vinz.dtp.ChangePasswordDTP;
import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.dtp.registerRequestDTP;
import com.example.vinz.response.responseLogin;
import com.example.vinz.response.responseRegister;
import com.example.vinz.service.changeUser;
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

    @Autowired
    private changeUser changeuser;

    @PostMapping("login")
    public ResponseEntity<responseLogin> Login(@Valid @RequestBody loginRequestDTP data){

        return loginservice.LoginService(data);

    }

    @PostMapping("register")
    public ResponseEntity<?> Register(@Valid @RequestBody registerRequestDTP data){

        return registerservice.RegisterService(data);

    }

    @PostMapping("change_Password")
    public ResponseEntity<?> ChangePassword(@Valid @RequestBody ChangePasswordDTP data){

        return changeuser.changePassword(data);

    }

    @PostMapping("change_Name")
    public ResponseEntity<?> ChangeName (@Valid @RequestBody ChangeNameDTP data){

        return changeuser.changeName(data);

    }
}
