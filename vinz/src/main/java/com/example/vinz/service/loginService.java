package com.example.vinz.service;

import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.entity.Users;
import com.example.vinz.repository.UserRepository;
import com.example.vinz.response.dto.UserDTO;
import com.example.vinz.response.responseLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class loginService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    public ResponseEntity<?> LoginService(loginRequestDTP data){

        try {

            Optional<Users> user = repository.findByEmail(data.email());

            if (user.isEmpty()){

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorreta.");

            }

            Users userGet = user.get();
            String hashedPassword = userGet.getPassword();
            boolean passwordMatches = passwordEncoder.matches(data.senha(), hashedPassword);


            if (passwordMatches){

                var expiresIn = 500L;

                var claims = JwtClaimsSet.builder()
                        .issuer("storeVinz")
                        .subject(String.valueOf(userGet.getIdPrivate()))
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

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorreta.");

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e);

        }
    }
}
