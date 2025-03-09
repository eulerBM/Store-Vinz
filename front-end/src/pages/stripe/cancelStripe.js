import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CancelStripe() {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/"); // Altere para a página desejada
        }, 5000); // 5 segundos

        return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }, [navigate]);


    return (

        <div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
            <strong>Transação de compra cancelada</strong> <br />Sua compra foi cancelada por motivos de cancelamento.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>


    );
}

export default CancelStripe;
