import { useParams } from 'react-router-dom';
import NavBar from '../Forms/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Product() {
    const {idPulbic} = useParams(); // Captura o id_public da URL
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/get/${idPulbic}`);
                setResults(response.data);
            } catch (err) {
                setError('Erro ao buscar os resultados');
            } finally {
                setLoading(false);
            }
        };

        if (idPulbic) {
            fetchResults();
        }
    }, [idPulbic]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div>
            <NavBar />
            <h1>Produto: {results.name}, {results.id}</h1>
        </div>
    );
}

export default Product;
