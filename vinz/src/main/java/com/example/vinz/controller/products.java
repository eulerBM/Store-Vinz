package com.example.vinz.controller;

import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.dtp.productEditeDTP;
import com.example.vinz.service.productsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("products/")
@RestController
public class products {

    @Autowired
    private productsService productsService;

    @GetMapping("all/{page}")
    public ResponseEntity<?> ProductsAll (@PathVariable("page") int page) {

        return productsService.ProductsAll(page);

    }

    @GetMapping("get/{idPublic}")
    public ResponseEntity<?> ProductsGet (@PathVariable("idPublic") UUID idPublic) {

        return productsService.ProductsGet(idPublic);

    }

    @PostMapping("get/list")
    public ResponseEntity<?> ProductsListGet (@RequestBody List<String> data){

        return productsService.ProductsListGet(data);

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
    public ResponseEntity<?> SearchProductName (@RequestParam("nameProducts") String productName, @RequestParam("page") int page){

        return productsService.SearchProductName(productName, page);

    }
}
