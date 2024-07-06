package com.example.vinz.service;

import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.response.responseLogin;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class loginService {

    public ResponseEntity<responseLogin> LoginService(loginRequestDTP data){

        return ResponseEntity.ok(new responseLogin(data));

    }
}
