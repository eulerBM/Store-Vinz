package com.example.vinz.entity;


import com.example.vinz.dtp.registerRequestDTP;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Table(name = "users")
@Entity(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPrivate;

    @Column(unique = true, nullable = false)
    private UUID idPublic;

    @Column(length = 150, nullable = false)
    private String name;

    @Column(length = 300, unique = true)
    private String email;

    @Column(length = 300, nullable = false)
    private String password;

    @Column(length = 6, nullable = false)
    private ChoiceRole role;

    @Column(nullable = false)
    private LocalDateTime createAccount;

    public Users(registerRequestDTP data) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        this.name = data.nome();
        this.email = data.email();
        this.password = passwordEncoder.encode(data.password());
        this.role = ChoiceRole.USER;
        this.createAccount = LocalDateTime.now();

    }

    public enum ChoiceRole {
        ADMIN,
        USER
    }

    @PrePersist
    public void generateIdPublic() {

        if (idPublic == null) {

            idPublic = UUID.randomUUID();

        }
    }

    public Users() {
    }

    public long getIdPrivate() {
        return idPrivate;
    }

    public void setIdPrivate(long idPrivate) {
        this.idPrivate = idPrivate;
    }

    public UUID getIdPublic() {
        return idPublic;
    }

    public void setIdPublic(UUID idPublic) {
        this.idPublic = idPublic;
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

    public ChoiceRole getRole() {
        return role;
    }

    public void setRole(ChoiceRole role) {
        this.role = role;
    }
}



