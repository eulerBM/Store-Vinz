import { useState } from "react";

function CheckoutButton({ amount, nameProduct, nameDescription}) {
    const [loading, setLoading] = useState(false);

    const formatForCent = Math.round(amount * 100)

    const handleCheckout = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:8080/stripe/create-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                amount: formatForCent,
                nameProduct: nameProduct,
                nameDescription: nameDescription})
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

export default CheckoutButton;
