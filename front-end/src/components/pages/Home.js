import NavBar from "../Forms/NavBar";
import { useState, useEffect } from 'react';
import Carrinho from "../utils/Carrinho";
import Pagination from "../utils/Pagination";
import axios from 'axios';

function Home() {
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const { add } = Carrinho();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userStatus = userInfo ? userInfo : false;
    const [totalPages, setTotalPages] = useState(1);
    const [PageAtual, setPageAtual] = useState(0);

    const formatPrice = (price) => {
        if (!price) return "0,00";
        return parseFloat(price)
            .toFixed(2)
            .replace(".", ",") 
            .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://192.168.3.103:8080/products/all/${PageAtual}`);
            if (response.status === 200) {
                setProducts(response.data.products || []);
                setTotalPages(response.data.totalPages || 1);
                setPageAtual(response.data.currentPage);
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setErrorMessage('Tente mais tarde');
            } else {
                setErrorMessage('Erro interno, tente mais tarde.');
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [PageAtual]);

    return (
        <div>
            <NavBar />

            <div className="container">
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            {product.description
                                                ? product.description.length > 40
                                                    ? `${product.description.substring(0, 40)}...`
                                                    : product.description
                                                : 'Descrição não disponível'}
                                        </p>
                                        <p className="card-text">
                                            R$: {formatPrice(product.price)}
                                        </p>
                                        <a href={`/products/get/${product.id_public}`} className="btn btn-primary">
                                            Ver mais
                                        </a>
                                        <a
                                            className="btn btn-primary"
                                            onClick={() => add(product.id_public, userStatus)}
                                        >
                                            + Carrinho
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum produto encontrado.</p>
                    )}
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                
                <div className="d-flex justify-content-center mt-4">
                    <Pagination 
                        totalPages_={totalPages} 
                        pageAtual_={PageAtual} 
                        onPageChange={setPageAtual} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
