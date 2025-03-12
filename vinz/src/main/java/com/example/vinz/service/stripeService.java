package com.example.vinz.service;

import com.example.vinz.dtp.stripeDTP.stripeMultiProducts;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class stripeService {

    @Value("${Stripe.apiKey}")
    private String stripeKeySecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeKeySecret;
    }

    public String createCheckoutSession(Long amount, String nameProduct, String nameDescription) throws StripeException {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success") // Redireciona após pagamento bem-sucedido
                .setCancelUrl("http://localhost:3000/cancel")   // Redireciona se o usuário cancelar
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("brl")
                                                .setUnitAmount(amount) // Valor em centavos (ex: 1000 = $10.00)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(nameProduct)
                                                                .setDescription(nameDescription)
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .build();

        Session session = Session.create(params);
        return session.getUrl(); // Retorna o link do Stripe Checkout

    }

    public String createCheckoutSessionForMultiProducts(List<stripeMultiProducts> items) throws StripeException {
        // Construir a lista de line items para a sessão de checkout
        List<SessionCreateParams.LineItem> lineItems = items.stream().map(item ->
                SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("brl")
                                        .setUnitAmount(item.amount() * 100) // Valor em centavos
                                        .setProductData(
                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName(item.name())
                                                        .setDescription(item.description())
                                                        .build()
                                        )
                                        .build()
                        )
                        .build()
        ).toList();

        // Configurar os parâmetros da sessão de checkout
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success") // URL de sucesso
                .setCancelUrl("http://localhost:3000/cancel")   // URL de cancelamento
                .addAllLineItem(lineItems)
                .build();

        // Criar a sessão de checkout
        Session session = Session.create(params);
        return session.getUrl(); // Retorna o link do Stripe Checkout
    }
}
