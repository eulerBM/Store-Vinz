package com.example.vinz.service;

import com.example.vinz.dtp.registerRequestDTP;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class registerService {

    public ResponseEntity<?> registerService(registerRequestDTP data){

        return ResponseEntity.ok("Registro feito com sucesso");

    }
}
