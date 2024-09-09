package com.example.vinz.controller;

import com.example.vinz.dto.InfosUserDTO;
import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.dtp.productEditeDTP;
import com.example.vinz.service.productsService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("products/")
@RestController
public class products {

    @Autowired
    private productsService productsService;

    @GetMapping("all")
    public ResponseEntity<?> ProductsAll () {

        return productsService.ProductsAll();

    }

    @GetMapping("get/{id}")
    public ResponseEntity<?> ProductsGet (@PathVariable long id) {

        return productsService.ProductsGet(id);

    }

    @PutMapping("criar-produto")
    public ResponseEntity<HttpStatus> ProductsCreate (@Valid @RequestBody productCreateDTP data){

        return productsService.ProductsCreate(data);

    }

    @PostMapping("edite/{id}")
    public ResponseEntity<?> ProductsEdite (@Valid @PathVariable @RequestBody long id, productEditeDTP data){

        return productsService.ProductsEdite(id, data);


    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> productsDelete (@PathVariable long id){

        return productsService.ProductsDelete(id);

    }
}
