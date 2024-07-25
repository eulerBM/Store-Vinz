package com.example.vinz.service;

import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.response.responseLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class loginService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<responseLogin> LoginService(loginRequestDTP data){

        try {

            Optional<Users> user = repository.findByEmail(data.email());

            if (user.isEmpty()){

                return ResponseEntity.badRequest().build();

            }

            Users userGet = user.get();
            String hashedPassword = userGet.getPassword();
            boolean passwordMatches = passwordEncoder.matches(data.senha(), hashedPassword);


            if (!passwordMatches){

                return ResponseEntity.badRequest().build();

            }

            return ResponseEntity.ok(new responseLogin(data));

        } catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }
    }
}
