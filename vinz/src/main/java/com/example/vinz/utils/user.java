package com.example.vinz.utils;

import com.example.vinz.repository.RedisRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class user {

    @Autowired
    private RedisRepository redisRepository;

    public Boolean IsOnlineOrCreate(UUID uuidUser){

        var getUserOnline = redisRepository.getUser(uuidUser);

        if (getUserOnline.isEmpty()){

            redisRepository.createUser(uuidUser);

            return true;

        }

        return false;

    }
}