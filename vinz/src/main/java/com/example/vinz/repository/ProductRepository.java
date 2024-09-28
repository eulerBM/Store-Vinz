package com.example.vinz.repository;

import com.example.vinz.entity.Product;
import com.example.vinz.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByNameContainingIgnoreCase(String name);

}


