package com.example.vinz.service;

import com.example.vinz.dtp.registerRequestDTP;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.response.responseRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class registerService {

    @Autowired
    private UserRepository repository;

    public ResponseEntity<?> RegisterService(registerRequestDTP data){

        try {
            Users user = new Users(data);

            repository.save(user);

            return ResponseEntity.ok(new responseRegister(data));

        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }
}
