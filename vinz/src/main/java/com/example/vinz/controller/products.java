package com.example.vinz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("products/")
@RestController
public class products {

    @PostMapping("all")
    public ResponseEntity<?> ProductsAll (){

        return ResponseEntity.ok().build();

    }
}
