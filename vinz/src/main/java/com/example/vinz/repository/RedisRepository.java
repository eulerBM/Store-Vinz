package com.example.vinz.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class RedisRepository {

    private static final String USER_KEY_PREFIX = "user:";

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void createUser(UUID uuid) {

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("uuid", uuid.toString());
        userMap.put("status", true);

        System.out.println("Criando usuário no Redis com UUID: " + uuid);

        try {
            redisTemplate.opsForHash().putAll(USER_KEY_PREFIX + uuid.toString(), userMap);
        } catch (Exception e) {
            System.out.println("Erro ao salvar usuário no Redis: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public Map<Object, Object> getUser(UUID uuid) {
        return redisTemplate.opsForHash().entries(USER_KEY_PREFIX + uuid.toString());
    }

    public void updateUserStatus(UUID uuid, boolean status) {
        redisTemplate.opsForHash().put(USER_KEY_PREFIX + uuid.toString(), "status", status);
    }

}
