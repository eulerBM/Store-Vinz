import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import CheckoutButtonForMultiProducts from "../stripe/CheckoutButtonForMultiProducts"
import homeUtils from "../../utils/homeUtils";
import Carrinho from "../../utils/Carrinho";

function CarrinhoPage() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [idPublicList, setIdPublicList] = useState([]);
    const getInfoUser = JSON.parse(localStorage.getItem("userInfo"));
    const { remove } = Carrinho();
    
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

            <CheckoutButtonForMultiProducts products={products} />

            <div className="container mt-3" >
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
                                            R$: {homeUtils.formatPrice(product.price)}
                                        </p>
                                        <div className="d-flex justify-content-between mt-2 gap-1">

                                            <a href={`/products/get/${product.id_public}`} className="btn btn-primary">
                                                Ver mais
                                            </a>

                                            <a
                                                className="btn btn-primary" 
                                                onClick={() => remove(product.id_public, getInfoUser.idPublic)}
                                            >
                                                Remove
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

                {errorMessage && <p>{errorMessage}</p>}

            </div>
        </div>

    );
}

export default CarrinhoPage;
