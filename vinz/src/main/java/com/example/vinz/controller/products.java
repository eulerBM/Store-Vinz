package com.example.vinz.controller;

import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.dtp.productEditeDTP;
import com.example.vinz.service.productsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("products/")
@RestController
public class products {

    @Autowired
    private productsService productsService;

    @GetMapping("all")
    public ResponseEntity<?> ProductsAll () {

        return productsService.ProductsAll();

    }

    @GetMapping("get/{idPublic}")
    public ResponseEntity<?> ProductsGet (@PathVariable("idPublic") UUID idPublic) {

        return productsService.ProductsGet(idPublic);

    }

    @PostMapping("criar")
    public ResponseEntity<?> ProductsCreate (@Valid @RequestBody productCreateDTP data, JwtAuthenticationToken token){

        return productsService.ProductsCreate(data, token);

    }

    @PostMapping("edite/{id}")
    public ResponseEntity<?> ProductsEdite (@Valid @PathVariable @RequestBody long id, productEditeDTP data){

        return productsService.ProductsEdite(id, data);

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> productsDelete (@PathVariable long id){

        return productsService.ProductsDelete(id);

    }

    @GetMapping("meus_publicados/{idPublic}")
    public ResponseEntity<?> myPublished (@PathVariable("idPublic") UUID idPublic, JwtAuthenticationToken token){

        return productsService.MyPublished(idPublic);

    }

    @GetMapping("search")
    public ResponseEntity<?> SearchProductName (@RequestParam("name") String productName){

        return productsService.SearchProductName(productName);

    }
}
