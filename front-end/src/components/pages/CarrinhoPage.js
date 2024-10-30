import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Forms/NavBar";
import Carrinho from "../utils/Carrinho";

function CarrinhoPage() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [idPublicList, setIdPublicList] = useState([]); // Suponha que você tenha a lista de IDs aqui

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('http://localhost:8080/products/get/list', idPublicList, {
                    headers: {
                        'Content-Type': 'application/json' // Certifique-se de enviar o cabeçalho correto
                    }
                });

                if (response.status === 200) {
                    setProducts(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    setErrorMessage('Tente mais tarde');
                } else {
                    setErrorMessage('Erro interno, tente mais tarde.');
                }
            }
        };

        if (idPublicList.length > 0) { // Verifique se a lista de IDs não está vazia
            fetchProducts();
        }
    }, [idPublicList]); // Dependência para recarregar quando a lista de IDs mudar

    return (    
        <div>
            <NavBar />
            <h1>Página do carrinho</h1>
            {errorMessage && <p>{errorMessage}</p>} {/* Exibir mensagem de erro se existir */}
            {/* Renderizar produtos aqui, se necessário */}
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.idPublic}>
                        <h2>{product.name}</h2>
                        {/* Outros detalhes do produto */}
                    </div>
                ))
            ) : (
                <p>Nenhum produto encontrado.</p>
            )}
        </div>
    );
}

export default CarrinhoPage;
