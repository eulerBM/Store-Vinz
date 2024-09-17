package com.example.vinz.service;

import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.dtp.productEditeDTP;
import com.example.vinz.entity.Product;
import com.example.vinz.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class productsService {

    @Autowired
    private ProductRepository repositoryUser;

    @Autowired
    private ProductRepository repositoryProduct;

    public ResponseEntity<?> ProductsAll (){

        try {

            List<Product> product = repositoryProduct.findAll();

            return ResponseEntity.ok().body(product);

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }

    }

    public ResponseEntity<?> ProductsGet (long id) {

        try {

            Optional<Product> product = repositoryProduct.findById(id);

            if (product.isEmpty()){

                return ResponseEntity.notFound().build();

            } else {

                Product productGET = product.get();

                return ResponseEntity.status(HttpStatus.OK).body(productGET);

            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public ResponseEntity<?> ProductsCreate (productCreateDTP data, JwtAuthenticationToken token){

        try {

            Product productModel = new Product(data);

            repositoryProduct.save(productModel);

            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public ResponseEntity<?> ProductsEdite (long id, productEditeDTP data){

        try {

            Optional<Product> product = repositoryProduct.findById(id);

            if (product.isEmpty()){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não existe.");

            } else {

                Product productGet = product.get();

                if (data.nomeProduto() != null && !data.nomeProduto().trim().isEmpty()){

                    productGet.setName(data.nomeProduto());

                }

                if (data.descriçãoProduto() != null && !data.descriçãoProduto().trim().isEmpty()){

                    productGet.setDescription(data.descriçãoProduto());

                }

                repositoryProduct.save(productGet);

                return ResponseEntity.status(HttpStatus.OK).body(productGet);

            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }

    }

    public ResponseEntity<?> ProductsDelete (long id){

        try {

            Optional<Product> product = repositoryProduct.findById(id);

            if (product.isEmpty()){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item não encontrado.");

            } else {

                repositoryProduct.deleteById(id);

                return ResponseEntity.status(HttpStatus.OK).body("Item excluido com sucesso.");

            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }
}



