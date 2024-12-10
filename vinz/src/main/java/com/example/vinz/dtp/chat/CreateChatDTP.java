package com.example.vinz.dtp.chat;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateChatDTP(

        UUID user_uuid,

        String content

) {
}
