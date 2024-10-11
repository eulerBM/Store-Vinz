package com.example.vinz.response;

import com.example.vinz.entity.Users;
import com.example.vinz.response.dto.UserDTO;

public record responseLogin (String acessToken, Long expiresIn, UserDTO user ){

}

