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

                setError(null);

                const response = await axios.get('http://localhost:8080/products/search', {
                    params: { name: searchTerm }
                });

                setResults(response.data);

            } catch (err) {
                
                setError(err.response.data)

            } finally {

                setLoading(false);

            }
        };

        if (searchTerm) {
            fetchResults();
        } else {
            setLoading(false);
            setError('Nenhum termo de busca fornecido.');
        }
    }, [searchTerm]);

    // Exibe "Carregando" enquanto a requisição está em andamento
    if (loading) return (
        <div>
            <NavBar />
            <p>Carregando...</p>
        </div>
    );

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    {error ? (
                        // Mostra mensagem de erro no lugar dos produtos
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        results.length > 0 ? (
                            // Renderiza os produtos quando encontrados
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
                            // Mostra mensagem de "Nenhum resultado encontrado" quando não há produtos
                            <p>Nenhum resultado encontrado.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
