import NavBar from "../Forms/NavBar";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home () {

    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]); // Para armazenar os produtos retornados pela API

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products/all');

                if (response.status === 200) {
                    setProducts(response.data); // Armazena os produtos no estado
                }
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    setErrorMessage('Tente mais tarde');
                } else {
                    setErrorMessage('Erro interno tente mais tarde.');
                }
            }
        };

        fetchProducts();
    }, []); // O array vazio como segundo argumento faz com que o efeito seja executado apenas uma vez ao montar o componente

    return (

        <div>

            <NavBar />

            <div>
                <h2>Lista de Produtos</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </div>
        
    );
}

export default Home;