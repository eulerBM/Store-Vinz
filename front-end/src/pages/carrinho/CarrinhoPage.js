import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";

function CarrinhoPage() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [idPublicList, setIdPublicList] = useState([]);

    useEffect(() => {
        const getInfosUser = JSON.parse(localStorage.getItem("userInfo"));
        const storedCart = JSON.parse(localStorage.getItem("cart_" + getInfosUser.idPublic)) || [];
        setIdPublicList(storedCart);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post(
                    'http://192.168.3.103:8080/products/get/list',
                    idPublicList,
                    { headers: { 'Content-Type': 'application/json' } }
                );

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

        if (idPublicList.length > 0) fetchProducts();
    }, [idPublicList]);

    return (    
        <div>
            <NavBar />
            <h1>Página do carrinho</h1>
            {errorMessage && <p>{errorMessage}</p>}
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.idPublic}>
                        <h2>{product.name}</h2>
                        {/* Outros detalhes do produto */}
                    </div>
                ))
            ) : (
                <p>{idPublicList.length > 0 ? "Carregando produtos..." : "Nenhum produto encontrado."}</p>
            )}
        </div>
    );
}

export default CarrinhoPage;
