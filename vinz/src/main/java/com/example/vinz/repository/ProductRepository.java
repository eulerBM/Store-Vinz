package com.example.vinz.repository;

import com.example.vinz.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long>{

    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Optional<Product> findByIdPublic(UUID idPublic);

    Page<Product> findByUsers_IdPublic(UUID userIdPublic, Pageable pageable);

    List<Product> findAllByIdPublicIn(List<UUID> idPublic);

}


