package com.example.vinz.entity;

import com.example.vinz.dtp.productCreateDTP;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Column(length = 50, nullable = false)
    private LocalDateTime published_data;

    @Column(name = "image", columnDefinition = "bytea", nullable = false)
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Users users;

    public Product(String name, String description, String price, byte[] image, Users user) throws IOException {

        this.idPublic = UUID.randomUUID();
        this.name = name;
        this.description = description;
        this.price = new BigDecimal(price);
        this.published_data = LocalDateTime.now();
        this.image = image;
        this.users = user;

    }

    public Product() {
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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
