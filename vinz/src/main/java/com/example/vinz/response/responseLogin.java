package com.example.vinz.response;

import com.example.vinz.dtp.loginRequestDTP;
import com.example.vinz.entity.Users;


public record responseLogin (String acessToken, Long expiresIn, Users user){
}
