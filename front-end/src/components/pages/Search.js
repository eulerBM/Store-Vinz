import NavBar from "../Forms/NavBar";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Search() {

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
        <NavBar />
        <div className="container">
            <div className="row">
                {results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.id} className="col-md-4 mb-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={result.imageUrl || 'default.jpg'} className="card-img-top" alt={result.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{result.name}</h5>
                                    <p className="card-text">
                                        {result.description || 'Descrição não disponível'}
                                    </p>
                                    <a href={`/products/${result.id}`} className="btn btn-primary">
                                        Ver mais
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum resultado encontrado.</p>
                )}
            </div>
        </div>
    </div>
    );
}

export default Search;
