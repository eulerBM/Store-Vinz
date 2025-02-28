package com.example.vinz.service;

import com.example.vinz.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class emailService {

    @Value("${my.email}")
    private String myEmail;

    @Autowired
    private JavaMailSender mailSender;

    public void changePasswordService(String to){

    }

    public void welcome(String to){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Seja bem vindo");
        message.setText("Olá usuario você acabou de se cadastrar no Store Vinz, estamos passando pra te desejar otimas compras!");
        message.setFrom(myEmail);

    }

    public void productCreate(Users user, String nameProduct){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Você publicou um produto!");
        message.setText("Óla " + user.getName() + "você acabou de publicar " + nameProduct + "na loja virtual Store Vinz");
        message.setFrom(myEmail);

        mailSender.send(message);

    }

    public void changePasswordService(String to, String subJect, String text){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subJect);
        message.setText(text);
        message.setFrom(myEmail);
        mailSender.send(message);

    }
}
