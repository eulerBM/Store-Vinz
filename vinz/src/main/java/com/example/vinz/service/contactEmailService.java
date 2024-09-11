package com.example.vinz.service;

import com.example.vinz.dtp.contactEmailRequestDTP;
import com.example.vinz.response.responseContactEmail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class contactEmailService {

    public ResponseEntity<?> contactemailservice(contactEmailRequestDTP data){

        return ResponseEntity.ok().body(data);

    }
}
