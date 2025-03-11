package com.example.vinz.controller;

import com.example.vinz.service.stripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("stripe/")
public class stripe {

    @Autowired
    private stripeService stripeService;

    @PostMapping("create-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody Map<String, Object> request){

        try {

            Long amount = ((Number) request.get("amount")).longValue();
            String nameProduct = request.get("nameProduct").toString();
            String nameDescription = request.get("nameDescription").toString();

            String checkoutUrl = stripeService.createCheckoutSession(amount, nameProduct, nameDescription);
            return ResponseEntity.ok(Map.of("url", checkoutUrl));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }
}
