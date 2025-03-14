package com.example.vinz.service;

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
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class productsService {

    @Autowired
    private UserRepository repositoryUser;

    @Autowired
    private ProductRepository repositoryProduct;

    @Autowired
    private emailService emailService;

    public ResponseEntity<?> ProductsAll(int page){

        try {

            if (page < 0) page = 0;

            Pageable pageable = PageRequest.of(page,3);

            Page<Product> product = repositoryProduct.findAll(pageable);

            byte[] image = product.getContent().getFirst().getImage();

            Map<String, Object> response = new HashMap<>();
            response.put("products", product.getContent());
            response.put("image", Base64.getEncoder().encodeToString(image));
            response.put("totalPages", product.getTotalPages());
            response.put("currentPage", product.getNumber());
            response.put("totalElements", product.getTotalElements());

            return ResponseEntity.ok().body(response);

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public ResponseEntity<?> ProductsGet(UUID idPublic) {

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

    public ResponseEntity<?> ProductsCreate(String name, String description, String price, MultipartFile image, JwtAuthenticationToken token){

        try {

            if (image.isEmpty()){

                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Imagem não enviada");
            }

            Long userId = getIdToken.extrairTokenId(token);

            Optional<Users> userGet = repositoryUser.findById(userId);

            Product productModel = new Product(name, description, price, image.getBytes(), userGet.get());

            repositoryProduct.save(productModel);

            return ResponseEntity.status(HttpStatus.CREATED).body("Produto criado com sucesso!");

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }

    public ResponseEntity<?> ProductsEdite(long id, productEditeDTP data){

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

    public ResponseEntity<?> ProductsDelete(long id){

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

    public ResponseEntity<?> MyPublished(UUID idPublic, int page){

        Pageable pageable = PageRequest.of(page, 1);

        Page<Product> product = repositoryProduct.findByUsers_IdPublic(idPublic, pageable);
        byte[] image = product.getContent().getFirst().getImage();

        Map<String, Object> response = new HashMap<>();
        response.put("products", product.getContent());
        response.put("image", Base64.getEncoder().encodeToString(image));
        response.put("totalPages", product.getTotalPages());
        response.put("currentPage", product.getNumber());
        response.put("totalElements", product.getTotalElements());

        if (product.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Você não tem produtos publicados!");

        } else {

            return ResponseEntity.status(HttpStatus.OK).body(response);

        }
    }

    public ResponseEntity<?> SearchProductName(String nameProducts, int page) {

        try {

            Pageable pageable = PageRequest.of(page, 1);

            Page<Product> product = repositoryProduct.findByNameContainingIgnoreCase(nameProducts, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("products", product.getContent());
            response.put("totalPages", product.getTotalPages());
            response.put("currentPage", product.getNumber());
            response.put("totalElements", product.getTotalElements());

            if (product.isEmpty()){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item não encontrado!");

            } else {

                return ResponseEntity.status(HttpStatus.OK).body(response);

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



