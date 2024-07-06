package com.example.vinz.service;

import com.example.vinz.dtp.registerRequestDTP;
import com.example.vinz.response.responseRegister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class registerService {

    public ResponseEntity<responseRegister> RegisterService(registerRequestDTP data){

        return ResponseEntity.ok(new responseRegister(data));

    }
}
