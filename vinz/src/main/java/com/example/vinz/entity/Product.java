package com.example.vinz.entity;

import com.example.vinz.dtp.productCreateDTP;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Table(name = "product")
@Entity(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private UUID idPublic;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 500, nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 50, nullable = false)
    private LocalDateTime published_data;

    public Product(productCreateDTP data) {
        System.out.println("Valor original do preço: " + data.price());
        BigDecimal price;

        try {
            price = new BigDecimal(data.price());
            System.out.println("Valor convertido para BigDecimal: " + price);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Preço inválido: " + data.price());
        }

        this.idPublic = UUID.randomUUID();
        this.name = data.name();
        this.description = data.description();
        this.price = price;
        this.published_data = LocalDateTime.now();

    }

    public Product() {
    }

    public long getId() {
        return id;
    }

    public UUID getId_public() {
        return idPublic;
    }

    public LocalDateTime getPublished_data() {
        return published_data;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
