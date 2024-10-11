package com.example.vinz.utils;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class getIdToken {

    public Long extrairTokenId (JwtAuthenticationToken token) {

        var getTokenString = token.getToken().getSubject();

        return Long.parseLong(getTokenString);

    }
}
