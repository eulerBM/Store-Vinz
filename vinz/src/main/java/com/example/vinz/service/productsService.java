package com.example.vinz.service;

import com.example.vinz.dtp.productCreateDTP;
import com.example.vinz.dtp.productEditeDTP;
import com.example.vinz.entity.Product;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.utils.getIdToken;
import com.example.vinz.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class productsService {

    @Autowired
    private UserRepository repositoryUser;

    @Autowired
    private ProductRepository repositoryProduct;

    public ResponseEntity<?> ProductsAll (){

        try {

            Pageable pageable = PageRequest.of(0,2);

            Page<Product> product = repositoryProduct.findAll(pageable);

            return ResponseEntity.ok().body(product.getContent());

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }

    }

    public ResponseEntity<?> ProductsGet (UUID idPublic) {

        try {

            Optional<Product> product = repositoryProduct.findByIdPublic(idPublic);

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

            Long userId = getIdToken.extrairTokenId(token);

            Optional<Users> userGet = repositoryUser.findById(userId);

            Product productModel = new Product(data, userGet.get());

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

    public ResponseEntity<?> MyPublished(UUID idPublic){

        List<Product> productsMy = repositoryProduct.findByUsers_IdPublic(idPublic);

        if (productsMy.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Você não tem produtos publicados!");

        } else {

            return ResponseEntity.status(HttpStatus.OK).body(productsMy);

        }

    }

    public ResponseEntity<?> SearchProductName(String productName) {

        try {

            List<Product> product = repositoryProduct.findByNameContainingIgnoreCase(productName);

            if (product.isEmpty()){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item não encontrado!");

            } else {

                return ResponseEntity.status(HttpStatus.OK).body(product);

            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public ResponseEntity<?> ProductsListGet(List<String> data) {

        try {

            List<UUID> idPublicsToUuid = data.stream()
                    .map(UUID::fromString)
                    .collect(Collectors.toList());


            List<Product> products = repositoryProduct.findAllByIdPublicIn(idPublicsToUuid);

            if (products.isEmpty()){

                return ResponseEntity.notFound().build();

            } else {

                return ResponseEntity.status(HttpStatus.OK).body(products);

            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }
}



