package com.example.vinz.service;

import com.example.vinz.dtp.ChangePasswordDTP;
import com.example.vinz.repository.UserRepository;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class changeUser {

    @Autowired
    private UserRepository repository;

    public ResponseEntity<?> changePassword (ChangePasswordDTP data){

        return ResponseEntity.ok().build();

    }
}
