package com.example.vinz.service;

import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.response.dto.UserDTO;
import com.example.vinz.response.responseLogin;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.util.Optional;

@Service
public class loginService {

    private static final Logger logger = LoggerFactory.getLogger(loginService.class);

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    public ResponseEntity<responseLogin> LoginService(loginRequestDTP data){

        try {

            Optional<Users> user = repository.findByEmail(data.email());

            if (user.isEmpty()){

                return ResponseEntity.badRequest().build();

            }

            Users userGet = user.get();
            String hashedPassword = userGet.getPassword();
            boolean passwordMatches = passwordEncoder.matches(data.senha(), hashedPassword);


            if (passwordMatches){

                var expiresIn = 500L;

                var claims = JwtClaimsSet.builder()
                        .issuer("storeVinz")
                        .subject(String.valueOf(userGet.getIdPublic()))
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(expiresIn))
                        .claim("scope", userGet.getRole().name())
                        .build();

                var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

                UserDTO userResponseDTO = new UserDTO(
                        userGet.getIdPrivate(),
                        userGet.getIdPublic(),
                        userGet.getName(),
                        userGet.getEmail(),
                        userGet.getRole(),
                        userGet.getCreateAccount()
                );

                return ResponseEntity.ok(new responseLogin(jwtValue, expiresIn, userResponseDTO));

            }

            return ResponseEntity.badRequest().build();

        } catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }
    }
}
