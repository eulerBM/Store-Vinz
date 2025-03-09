import NavBar from '../../components/navbar/NavBar'
import { useState, useEffect } from 'react';
import Carrinho from "../../utils/Carrinho";
import Pagination from "../../utils/pagination/Pagination";
import CheckoutButton from '../stripe/CheckoutButton';
import './home.css'
import homeService from '../../services/homeService'
import homeUtils from '../../utils/homeUtils'

function Home() {
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const { add } = Carrinho();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userStatus = userInfo ? userInfo : false;
    const [totalPages, setTotalPages] = useState(1);
    const [PageAtual, setPageAtual] = useState(0);
    const [image, setImgae] = useState();

    const fetchProducts = async () => {

        const result = await homeService.getAllProducts(PageAtual);

        if (result.error) {

            setErrorMessage(result.error);

        } else {

            setProducts(result.products || []);
            setTotalPages(result.totalPages || 1);
            setPageAtual(result.currentPage);
            setImgae(result.image)

        }
    };

    useEffect(() => {
        fetchProducts();
    }, [PageAtual]);

    return (
        <div>
            <NavBar />
            
            <div className="container mt-3" >
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <img className="image" src={`data:image/jpeg;base64,${image}`} alt="Produto" />
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            {product.description
                                                ? product.description.length > 40
                                                    ? `${product.description.substring(0, 40)}...`
                                                    : product.description
                                                : 'Descrição não disponível'}
                                        </p>
                                        <p className="card-text">
                                            R$: {homeUtils.formatPrice(product.price)}
                                        </p>
                                        <div className="d-flex justify-content-between mt-2 gap-1">

                                            <CheckoutButton amount={product.price} nameProduct={product.name} nameDescription={product.description}/>
                                            <a
                                                className="btn btn-primary mx-3"
                                                onClick={() => add(product.id_public, userStatus)}
                                            >
                                                Carrinho
                                            </a>
                                            <a href={`/products/get/${product.id_public}`} className="btn btn-primary">
                                                Ver mais
                                            </a>

                                        </div>
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
