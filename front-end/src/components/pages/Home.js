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
    }, []); 

    return (

        <div>
        <NavBar />

        <div className="container">
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    {product.description || 'Descrição não disponível'}
                                </p>
                                <a href={`/products/${product.id}`} className="btn btn-primary">
                                    Ver mais
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
        
    );
}

export default Home;