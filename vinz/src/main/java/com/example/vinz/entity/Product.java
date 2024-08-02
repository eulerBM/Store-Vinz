package com.example.vinz.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "product")
@Entity(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private UUID id_public;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 500, nullable = false)
    private String description;

    @Column(length = 50, nullable = false)
    private LocalDateTime published_data;

    public Product(UUID id_public, String name, String description, LocalDateTime published_data) {

        this.id_public = UUID.randomUUID();
        this.name = name;
        this.description = description;
        this.published_data = published_data;

    }
}
