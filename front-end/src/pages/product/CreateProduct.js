import { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import { convertImageToBytes } from "../../utils/convertToByte";
import EstadosECidades from "../../utils/EstadosECidades";

function CreateProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: undefined
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
        const { name, value, files } = e.target;

        if (name === "image") {
            // Garantir que a imagem seja um arquivo válido
            setProduct({
                ...product,
                [name]: files ? files[0] : undefined,
            });
        } else if (name === "price") {
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

        const estado = localStorage.getItem("estado")
        const cidade = localStorage.getItem("cidade")

        // Criar FormData
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", numericPrice);
        formData.append("location", `${cidade}, ${estado}`);
        formData.append("image", product.image); // Adicionando a imagem

        try {
            console.log(formData)
            const token = localStorage.getItem("token");
            await axios.post("http://192.168.3.103:8080/products/criar", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Produto criado com sucesso!");
            setProduct({ name: "", description: "", price: "", image: undefined });
            localStorage.removeItem("estado")
            localStorage.removeItem("cidade")
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

                    <EstadosECidades/>

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
                    <div className="form-group mt-3">
                        <label htmlFor="price">Imagem</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-control"
                            placeholder="Imagem de capa"
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
