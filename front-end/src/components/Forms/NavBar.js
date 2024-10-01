import '../../css/HomeCss.css';
import Logout from '../pages/outh/Logout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../css/FormLogin.css';
import axios from 'axios';

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        setLoading(true);
        setError(null); // Limpa qualquer erro anterior

        try {
            const response = await axios.get(`http://localhost:8080/products/search`, {
                params: { name: searchTerm } // Muda o nome do parâmetro para 'name'
            });
            setResults(response.data); // Salva os resultados da busca
        } catch (err) {
            setError('Erro ao buscar resultados. Tente novamente mais tarde.');
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand">Store-Vinz</a>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Principal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/conta">Conta</Link>
                        </li>
                        <li className="nav-item">
                            <a><Logout /></a>
                        </li>
                    </ul>

                    {/* Formulário de busca */}
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Buscar..." 
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado do termo de busca
                        />
                        <button className="btn btn-outline-success" type="submit" disabled={loading}>
                            {loading ? 'Buscando...' : 'Procurar'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Exibição dos resultados */}
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {results.length > 0 && (
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>{result.name}</li> // Mostra o nome de cada resultado
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
