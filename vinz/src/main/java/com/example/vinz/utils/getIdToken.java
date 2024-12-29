package com.example.vinz.utils;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class getIdToken {

    public static Long extrairTokenId(JwtAuthenticationToken token) {

        String getTokenString = token.getToken().getSubject();

        return Long.parseLong(getTokenString);

    }
}