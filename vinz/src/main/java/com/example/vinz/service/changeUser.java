package com.example.vinz.service;

import com.example.vinz.dtp.ChangeNameDTP;
import com.example.vinz.dtp.ChangePasswordDTP;
import com.example.vinz.dtp.DeleteUserDTP;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.utils.getIdToken;
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

    public ResponseEntity<?> changePassword (ChangePasswordDTP data, JwtAuthenticationToken token){

        try {

            Long userID = getIdToken.extrairTokenId(token);

            Optional<Users> user = repository.findById(userID);

            if (user.isEmpty()){

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado.");

            }

            if (data.senhaNova().equals(data.senhaAntiga())){

                return ResponseEntity.status(HttpStatus.CONFLICT).body("Senha antiga e a nova são parecidas!");
            }

            Users userGet = user.get();
            userGet.setPassword(passwordEncoder.encode(data.senhaNova()));
            repository.save(userGet);

            return ResponseEntity.ok().body("Senha trocada com sucesso !");

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