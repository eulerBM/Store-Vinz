package com.example.vinz.service;

import ch.qos.logback.core.status.Status;
import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.entity.Product;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.ProductRepository;
import com.example.vinz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class productsService {

    @Autowired
    private ProductRepository repositoryUser;

    @Autowired
    private ProductRepository repositoryProduct;

    public ResponseEntity<HttpStatus> ProductsGet (long id) {

        try {

            Optional<Product> product = repositoryUser.findById(id);

            if (product.isEmpty()){

                return ResponseEntity.notFound().build();

            }

            return ResponseEntity.status(HttpStatus.OK).build();


        } catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }
    }

    public ResponseEntity<HttpStatus> ProductsCreate (productCreateDTP data){

        try {

            Product product = new Product(data);

            repositoryProduct.save(product);

            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }
    }

    public ResponseEntity<?> ProductsEdite (long id){
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> ProductsDelete (){
        return ResponseEntity.ok().build();
    }

}
