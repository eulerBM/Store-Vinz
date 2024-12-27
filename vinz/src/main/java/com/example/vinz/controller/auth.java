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

    @PostMapping(path = "login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> Login(@Valid @RequestBody loginRequestDTP data){

        return loginservice.LoginService(data);

    }

    @PostMapping(path = "register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> Register(@Valid @RequestBody registerRequestDTP data){

        return registerservice.RegisterService(data);

    }

    @PostMapping(path = "user", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> User(@Valid @RequestBody registerRequestDTP data){

        return registerservice.RegisterService(data);

    }

    @PostMapping(path = "change_Password", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> ChangePassword(@Valid @RequestBody ChangePasswordDTP data, JwtAuthenticationToken token){

        return changeuser.changePassword(data, token);

    }

    @PostMapping(path = "change_Name", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> ChangeName (@Valid @RequestBody ChangeNameDTP data, JwtAuthenticationToken token){

        return changeuser.changeName(data, token);

    }

    @DeleteMapping(path = "delete_User/{id}", params = "id")
    public ResponseEntity<?> DeleteUser (@Valid @PathVariable @RequestBody long id, DeleteUserDTP data, JwtAuthenticationToken token){

        return changeuser.deleteUser(id, data, token);

    }
}
