import NavBar from "../Forms/NavBar";
import { useState, useEffect } from 'react';
import Carrinho from "../utils/Carrinho";
import Pagination from "../utils/Pagination";
import axios from 'axios';

function Home () {

    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    let alertStatus = false;
    const { add } = Carrinho();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userStatus = userInfo ? userInfo : false;
    const [totalPages, setTotalPages] = useState(1);
    let page = 0

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/all/${page}`);

                if (response.status === 200) {
                    setProducts(response.data);
                    setTotalPages(response.data.totalPages)
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
    
    const fetchProducts = (page) => {
        
        axios.get(`http://localhost:8080/products/all/${page}`).then((response) => {
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        });
    };

    useEffect(() => {
        fetchProducts(1);
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

                                {product.description
                                    ? product.description.length > 40 
                                        ? `${product.description.substring(0, 40)}...` 
                                        : product.description
                                    : 'Descrição não disponível'}
                                    
                                </p>
                                

                                <a href={`/products/get/${product.id_public}`} className="btn btn-primary">
                                    Ver mais
                                </a>

                                <a className="btn btn-primary" onClick={() => 
                                    add(product.id_public, userStatus)}>
                                    + Carrinho
                                </a>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Pagination totalPages={totalPages} onPageChange={fetchProducts} />
        
    </div>
        
    );
}

export default Home;