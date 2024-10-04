import NavBar from "../Forms/NavBar";
import { useState } from "react";
import axios from "axios";

function CreateProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
    });

    const token = localStorage.getItem('token');
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            

            console.log(product)

            await axios.post("http://localhost:8080/products/criar", {

                name: product.name,
                description: product.description,
                price: product.price,

            }, {

                headers: {

                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',

                },
            });

            setSuccess(true);
            setError(null);
            // Reinicializa todos os campos do produto
            setProduct({
                name: "",
                description: "",
                price: "", // Reinicializa o campo de preço
            });
        } catch (err) {
            setError("Erro ao criar o produto. Verifique os dados e tente novamente.");
            setSuccess(false);
        }
    };

    return (
        <div>
            <NavBar />

            <div className="container mt-4">
                <h2>Criar Produto</h2>
                {success && <div className="alert alert-success">Produto criado com sucesso!</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome do Produto</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            maxLength="200"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrição do Produto</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            maxLength="500"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Preço do Produto</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Criar Produto</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct;
