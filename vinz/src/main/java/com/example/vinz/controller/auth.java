package com.example.vinz.controller;

import com.example.vinz.dtp.*;
import com.example.vinz.service.changeUser;
import com.example.vinz.service.loginService;
import com.example.vinz.service.registerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/")
public class auth {

    @Autowired
    private loginService loginservice;

    @Autowired
    private registerService registerservice;

    @Autowired
    private changeUser changeuser;

    @PostMapping(value = "login")
    public ResponseEntity<?> Login(@Valid @RequestBody loginRequestDTP data){

        return loginservice.LoginService(data);

    }

    @PostMapping(value = "register")
    public ResponseEntity<?> Register(@Valid @RequestBody registerRequestDTP data){

        return registerservice.RegisterService(data);

    }

    @PostMapping(value = "user")
    public ResponseEntity<?> User(@Valid @RequestBody registerRequestDTP data){

        return registerservice.RegisterService(data);

    }

    @PostMapping(value = "change_Password")
    public ResponseEntity<?> ChangePassword(@Valid @RequestBody ChangePasswordDTP data){

        return changeuser.changePassword(data);

    }

    @PostMapping(value = "change_Name")
    public ResponseEntity<?> ChangeName (@Valid @RequestBody ChangeNameDTP data, JwtAuthenticationToken token){

        return changeuser.changeName(data, token);

    }

    @DeleteMapping(value = "delete_User/{id}")
    public ResponseEntity<?> DeleteUser (@Valid @PathVariable @RequestBody long id, DeleteUserDTP data, JwtAuthenticationToken token){

        return changeuser.deleteUser(id, data, token);

    }
}
