package com.example.vinz.entity;


import com.example.vinz.dtp.registerRequestDTP;
import jakarta.persistence.*;

@Table(name = "users")
@Entity(name = "users")
public class Users {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 150, nullable = false)
    private String name;

    @Column(length = 200, unique = true)
    private String email;

    @Column(length = 300, nullable = false)
    private String password;

    public Users(registerRequestDTP data) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Users(registerRequestDTP data) {
    }
}
