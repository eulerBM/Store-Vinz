package com.example.vinz.service;

import com.example.vinz.dtp.ChangeNameDTP;
import com.example.vinz.dtp.ChangePasswordDTP;
import com.example.vinz.dtp.DeleteUserDTP;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class changeUser {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> changePassword (ChangePasswordDTP data){

        try {

            Optional<Users> user = repository.findByEmail(data.Email());

            if (user.isEmpty()){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail não encontrado.");

            }

            Users userGet = user.get();
            String hashedPassword = userGet.getPassword();
            boolean passwordMatches = passwordEncoder.matches(data.senhaNova(), hashedPassword);

            if (passwordMatches){

                return ResponseEntity.status(HttpStatus.CONFLICT).body("Senha igual a antiga.");

            }

            if (!userGet.getEmail().equals(data.Email())){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

            } else {

                userGet.setPassword(passwordEncoder.encode(data.senhaNova()));
                repository.save(userGet);

                return ResponseEntity.ok().body("Senha trocada com sucesso !");

            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }

    }

    public ResponseEntity<?> changeName (ChangeNameDTP data, JwtAuthenticationToken token){

        return ResponseEntity.ok().build();

    }

    public ResponseEntity<?> deleteUser (long id, DeleteUserDTP data, JwtAuthenticationToken token) {

        try {

            Optional<Users> user = repository.findById(id);

            if (user.isEmpty()) {

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item com esse ID nao existe.");

            } else {

                repository.deleteById(id);

                return ResponseEntity.status(HttpStatus.OK).body("Item excluido com sucesso.");
            }

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }
}
