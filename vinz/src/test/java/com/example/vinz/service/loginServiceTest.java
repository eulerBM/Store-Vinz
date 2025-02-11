package com.example.vinz.service;


import com.example.vinz.entity.Product;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;


import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class loginServiceTest {

    @InjectMocks
    private loginService loginservice;

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtEncoder jwtEncoder;

    @Test
    @DisplayName("Deve Buscar por email no banco")
    public void deveBuscarPorEmailNoBanco(){

        String email = "teste@gmail.com";

        Users users = new Users();

        users.setIdPrivate(1);
        users.setIdPublic(UUID.randomUUID());
        users.setName("teste");
        users.setEmail(email);
        users.setPassword("teste123");
        users.setRole(Users.ChoiceRole.USER);
        users.setCreateAccount(LocalDateTime.now());
        users.setProduct(new ArrayList<Product>());

        Mockito.when(repository.findByEmail(email)).thenReturn(Optional.of(users));

        Optional<Users> result = repository.findByEmail(email);

        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());

    }




}