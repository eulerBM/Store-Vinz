import { useState } from "react";
import axios from "axios";

function CreateProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: null, // Adicionando campo para imagem
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("image", product.image); 

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/products/criar", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Produto criado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao criar o produto.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Preço</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Imagem</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Criar Produto</button>
            </form>
        </div>
    );
}

export default CreateProduct;
