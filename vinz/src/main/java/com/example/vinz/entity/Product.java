package com.example.vinz.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "product")
@Entity(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private UUID id_public;

    private String name;

    private String description;

    private String
}
