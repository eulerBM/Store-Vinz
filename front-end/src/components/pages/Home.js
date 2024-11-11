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
    const [totalPages, setTotalPages] = useState(0);
    const [Pages, setPages] = useState(0);
    const [PageAtual, setPageAtual] = useState(0)

    

    const fetchProducts = async () => {
        try {
            
            const response = await axios.get(`http://localhost:8080/products/all/${Pages}`);
            if (response.status === 200) {
                
                setProducts(response.data.products || []);
                setTotalPages(response.data.totalPages || 1);
                setPageAtual(response.data.currentPage)

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
    }, [Pages]);

    

    const paginaClikc = (page) => {

        if (page > totalPages ) return;

        // Remover "active" de outros links
        const activeLinks = document.querySelectorAll('.page-link.active');
        activeLinks.forEach(link => link.classList.remove('active'));

        let links = document.getElementById(`pagination-${page}`);

        if (links) {

        links.classList.add("active");

        }

        setPages(page)

        console.log(page)

    };


    const proximaPagina = () => {

        if (Pages >= totalPages -1) return;

        setPages(Pages + 1)

        console.log(Pages)

    };

    const voltarPagina = () => {

        if (Pages <= 0) return;
        
        setPages(Pages - 1)

        console.log(Pages)
    };

    return (
        <div>
            <NavBar />

            <div className="container">
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
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
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" aria-label="Previous" onClick={voltarPagina}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>

                    {totalPages > 0 ? (

                        Array.from({ length: totalPages }, (_, index) => (
                            <li className="page-item" key={index}>
                                <a className="page-link" id={`pagination-${index}`} onClick={() => paginaClikc(index)}>{index}</a>
                            </li>
                        ))
                    ) : (
                        <p>Erro no sistema!</p>
                    )}
                                        
                    <li class="page-item">
                    <a class="page-link" aria-label="Next" onClick={proximaPagina}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default Home;
