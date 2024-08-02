package com.example.vinz.controller;

import com.example.vinz.service.productsService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("products/")
@RestController
public class products {

    @Autowired
    private productsService productsService;

    @GetMapping("all")
    public ResponseEntity<?> ProductsAll () {

        return ResponseEntity.ok().build();

    }

    @GetMapping("get/{id}")
    public ResponseEntity<?> ProductsGet (@PathVariable @Min(1) long id) {

        return productsService.ProductsGet(id);

    }

    @PutMapping("criar-produto")
    public ResponseEntity<?> ProductsCreate (){

        return productsService.ProductsCreate();
    }

    @PostMapping("edite/{id}")
    public ResponseEntity<?> ProductsEdite (){

        return productsService.ProductsEdite();

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> productsDelete (){

        return productsService.ProductsDelete();
    }


}
