package com.example.vinz.entity;

import com.example.vinz.dtp.productCreateDTP;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "product")
@Entity(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private UUID id_public;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 500, nullable = false)
    private String description;

    @Column(length = 50, nullable = false)
    private LocalDateTime published_data;

    public Product() {
    }

    public Product(productCreateDTP data) {

        this.id_public = UUID.randomUUID();
        this.name = data.name();
        this.description = data.description();
        this.published_data = LocalDateTime.now();

    }

    public Product(String name, String description) {

        this.id_public = UUID.randomUUID();
        this.name = name;
        this.description = description;
        this.published_data = LocalDateTime.now();

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
