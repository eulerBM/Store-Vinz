package com.example.vinz.controller;

import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.dtp.productEditeDTP;
import com.example.vinz.service.productsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RequestMapping("products/")
@RestController
public class products {

    @Autowired
    private productsService productsService;

    @GetMapping(value = "all/{page}")
    public ResponseEntity<?> ProductsAll (@PathVariable("page") int page) {

        return productsService.ProductsAll(page);

    }

    @GetMapping(value = "get/{idPublic}")
    public ResponseEntity<?> ProductsGet (@PathVariable("idPublic") UUID idPublic) {

        return productsService.ProductsGet(idPublic);

    }

    @PostMapping(value = "get/list")
    public ResponseEntity<?> ProductsListGet (@RequestBody List<String> data){

        return productsService.ProductsListGet(data);

    }

    @PostMapping(value = "criar")
    public ResponseEntity<?> ProductsCreate (@Valid @RequestBody productCreateDTP data, JwtAuthenticationToken token){

        return productsService.ProductsCreate(data, token);

    }

    @PostMapping(value = "edite/{id}")
    public ResponseEntity<?> ProductsEdite (@Valid @PathVariable @RequestBody long id, productEditeDTP data){

        return productsService.ProductsEdite(id, data);

    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<?> productsDelete (@PathVariable long id){

        return productsService.ProductsDelete(id);

    }

    @GetMapping(value = "meus_publicados/{idPublic}/{page}")
    public ResponseEntity<?> myPublished (@PathVariable("idPublic") UUID idPublic, @PathVariable("page") int page, JwtAuthenticationToken token){

        return productsService.MyPublished(idPublic, page);

    }

    @GetMapping(value = "search")
    public ResponseEntity<?> SearchProductName (@RequestParam("nameProducts") String nameProducts, @RequestParam("page") int page){

        return productsService.SearchProductName(nameProducts, page);

    }
}
