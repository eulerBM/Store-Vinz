package com.example.vinz.controller;

import com.example.vinz.service.productsService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("products/")
@RestController
public class products {

    @Autowired
    private productsService productsService;

    @PostMapping("all")
    public ResponseEntity<?> ProductsAll () {

        return ResponseEntity.ok().build();

    }

    @PostMapping("get/{id}")
    public ResponseEntity<?> ProductsGet (@PathVariable @Min(1) long id) {

        return productsService.ProductsGet(id);

    }
}
