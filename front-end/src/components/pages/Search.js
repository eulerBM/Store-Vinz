import NavBar from "../Forms/NavBar";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Carrinho from "../utils/Carrinho";
import axios from 'axios';
import Pagination from "../utils/Pagination"

function Search() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { add } = Carrinho();
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userStatus = userInfo ? userInfo : false;

    const searchTerm = searchParams.get('nameProducts');

    const [totalPages, setTotalPages] = useState(1);
    const [pageAtual, setPageAtual] = useState(0);

    useEffect(() => {

        const fetchResults = async () => {

            try {

                setError(null);

                const response = await axios.get('http://localhost:8080/products/search', {
                    params: { nameProducts:searchTerm, page:pageAtual }
                });

                setTotalPages(response.data.totalPages || 1)
                setPageAtual(response.data.currentPage)
                setResults(response.data.products);
  
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
    }, [searchTerm, pageAtual]);

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
                                            <a href={`/products/get/${result.id_public}`} className="btn btn-primary">
                                                Ver mais
                                            </a>
                                            <a className="btn btn-primary" onClick={() => 
                                                add(result.id_public, userStatus)}>
                                                + Carrinho
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

            <Pagination totalPages_={totalPages} pageAtual_={pageAtual} onPageChange={setPageAtual} />

        </div>
    );
}

export default Search;
