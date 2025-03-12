import { useState } from "react";

function CheckoutButtonForMultiProducts({ products }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        // Formatar os produtos para centavos e preparar os dados para envio
        const formattedProducts = products.map(product => ({
            name: product.name,
            description: product.description,
            amount: Math.round(product.amount)
           
        }));

        const response = await fetch("http://localhost:8080/stripe/create-session-multi-products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: formattedProducts }) // Enviar a lista de itens
        });

        const data = await response.json();
        window.location.href = data.url; // Redireciona para o Stripe Checkout
    };

    return (
        <button className="btn btn-primary" onClick={handleCheckout} disabled={loading}>
            {loading ? "Carregando..." : "Comprar"}
        </button>
    );
}

export default CheckoutButtonForMultiProducts;
