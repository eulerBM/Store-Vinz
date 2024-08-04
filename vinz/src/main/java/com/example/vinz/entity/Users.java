package com.example.vinz.entity;


import com.example.vinz.dtp.registerRequestDTP;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

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

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        this.name = data.nome();
        this.email = data.email();
        this.password = passwordEncoder.encode(data.password());

    }

    public Users() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
