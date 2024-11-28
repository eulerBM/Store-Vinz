package com.example.vinz.entity;

import com.example.vinz.dtp.productCreateDTP;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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

    @Lob
    @Column(name = "image", nullable = true, columnDefinition = "BYTEA")
    private byte[] image;

    @Column(length = 50, nullable = false)
    private LocalDateTime published_data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Users users;

    public Product(productCreateDTP data, Users user) throws IOException {

        this.idPublic = UUID.randomUUID();
        this.name = data.name();
        this.description = data.description();
        this.price = new BigDecimal(data.price());;
        this.published_data = LocalDateTime.now();
        this.users = user;
        this.image = data.image().getBytes();

    }

    public Product() {
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public long getId() {
        return id;
    }

    public UUID getId_public() {
        return idPublic;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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
