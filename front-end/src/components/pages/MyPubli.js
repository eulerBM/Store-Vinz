import NavBar from "../Forms/NavBar";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from "../utils/Pagination"

function MyPubli() {
    const [products, setProducts] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const idPublic = userInfo ? userInfo.idPublic : null;
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (idPublic) {
            axios.get(`http://localhost:8080/products/meus_publicados/${idPublic}/${page}`)
                .then(response => {
                    console.log(page, totalPages)
                    setProducts(response.data.products);
                    setTotalPages(response.data.totalPages || 1)
                    setPage(response.data.currentPage)
                })
                .catch(error => {
                    console.error("Erro ao buscar produtos:", error);
                });
        }
    }, [idPublic, page]);

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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Pagination totalPages_={totalPages} pageAtual_={page} onPageChange={setPage} />
        
    </div>
    );


}

export default MyPubli;
