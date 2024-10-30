package com.example.vinz.repository;

import com.example.vinz.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByNameContainingIgnoreCase(String name);

    Optional<Product> findByIdPublic(UUID idPublic);

    List<Product> findByUsers_IdPublic(UUID userIdPublic);

    List<Product> findAllByIdPublicIn(List<UUID> idPublic);



}


