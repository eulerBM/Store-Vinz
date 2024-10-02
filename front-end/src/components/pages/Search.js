import NavBar from "../Forms/NavBar";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Search () {

    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchTerm = searchParams.get('name');

    useEffect(() => {

        const fetchResults = async () => {

        try {

            const response = await axios.get('http://localhost:8080/products/search', {

            params: { name: searchTerm }

            });

            setResults(response.data);

        } catch (err) {

            setError('Erro ao buscar os resultados');

        } finally {

            setLoading(false);

        }
        };

        if (searchTerm) {

            fetchResults();

        }
    }, [searchTerm]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;


    
    return (

        <div>  
            <NavBar/>
                <div>
                    <h2>Resultados para: {searchTerm}</h2>
                    <ul>
                        {results.length > 0 ? (
                        results.map((result) => <li key={result.id}>{result.name}</li>)
                        ) : (
                        <p>Nenhum resultado encontrado.</p>
                        )}
                    </ul>
                </div>
        </div>
    );
}

export default Search;