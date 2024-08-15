package com.example.vinz.dto;

import com.example.vinz.entity.Product;

import java.time.LocalDateTime;
import java.util.UUID;

public class InfosUserDTO {

    private long id;

    private UUID id_public;

    private String name;

    private String description;

    private LocalDateTime published_data;

    public InfosUserDTO(Product data) {
        this.id = data.getId();
        this.id_public = data.getId_public();
        this.name = data.getName();
        this.description = data.getDescription();
        this.published_data =data.getPublished_data();
    }
}
