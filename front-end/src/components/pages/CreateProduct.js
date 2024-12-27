import { useState } from "react";
import NavBar from "../Forms/NavBar";
import axios from "axios";

function CreateProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
    });

    // Formatar preço automaticamente
    const formatPrice = (value) => {
        const numericValue = value.replace(/\D/g, ""); // Remove tudo que não for número
        const formattedValue = (numericValue / 100).toLocaleString("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formattedValue;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "price") {
            // Atualizar preço formatado
            setProduct({
                ...product,
                [name]: formatPrice(value),
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Remove o formato do preço para enviar ao backend
        const numericPrice = product.price.replace(/\./g, "").replace(",", ".");

        if (!product.name || !product.description || isNaN(numericPrice)) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/products/criar", {
                name: product.name,
                description: product.description,
                price: numericPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Produto criado com sucesso!");
            setProduct({ name: "", description: "", price: "" }); // Resetar formulário
        } catch (err) {
            console.error(err.response || err);
            alert("Erro ao criar o produto. Por favor, tente novamente.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h1 className="text-center">Criar Produto</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Nome do produto"
                            value={product.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            rows="5"
                            placeholder="Descreva sobre seu produto"
                            value={product.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="price">Preço</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className="form-control"
                            placeholder="Preço do produto"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success mt-4 w-100"
                    >
                        Criar Produto
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
