package com.example.vinz.service;

import com.example.vinz.entity.Product;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.ProductRepository;
import com.example.vinz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class productsService {

    @Autowired
    private ProductRepository repository;

    public ResponseEntity<?> ProductsGet (long id) {

        try {

            Optional<Product> product = repository.findById(id);

            if (product.isEmpty()){

                return ResponseEntity.notFound().build();

            }

            return ResponseEntity.ok().build();


        } catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }
    }

    public ResponseEntity<?> ProductsCreate (){
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> ProductsEdite (){
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> ProductsDelete (){
        return ResponseEntity.ok().build();
    }

}
