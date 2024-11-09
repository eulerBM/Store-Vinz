import NavBar from "../Forms/NavBar";
import { useState, useEffect } from 'react';
import Carrinho from "../utils/Carrinho";
import Pagination from "../utils/Pagination";
import axios from 'axios';

function Home() {
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]); // Inicializado como um array vazio
    const { add } = Carrinho();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userStatus = userInfo ? userInfo : false;
    const [totalPages, setTotalPages] = useState(1);
    const [Pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0); // Página inicial 0
    

    // Função para buscar produtos com paginação
    const fetchProducts = async (page) => {
        try {
            
            const response = await axios.get(`http://localhost:8080/products/all/${Pages}`);
            if (response.status === 200) {
                setProducts(response.data || []); // Verifique se o conteúdo está correto
                setTotalPages(response.data.totalPages || 1); // Verifica se o total de páginas é válido
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setErrorMessage('Tente mais tarde');
            } else {
                setErrorMessage('Erro interno, tente mais tarde.');
            }
        }
    };

    // Carrega os produtos na inicialização do componente e quando currentPage mudar
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);


    const proximaPagina = () => {

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

            <Pagination totalPages={totalPages} onPageChange={fetchProducts} />

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" onClick={voltarPagina}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
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
