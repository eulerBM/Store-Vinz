import '../../css/HomeCss.css';
import Logout from '../pages/outh/Logout';
import { Link } from 'react-router-dom';
import { useState, useEffect, useSearchParams} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../css/FormLogin.css';
import axios from 'axios';

function NavBar (){
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // Extrai o termo de busca da URL
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/search`, {
        params: { q: searchQuery }
      });
      setResults(response.data);
    } catch (error) {
      setError('Erro ao buscar resultados');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim();
    if (searchTerm) {
      // Atualiza a URL com o termo de busca
      setSearchParams({ q: searchTerm });
    }
  };

    return (
        
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

                <a class="navbar-brand">Store-Vinz</a>

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                <li class="nav-item">

                    <Link class="nav-link active" aria-current="page" to="/">Principal</Link>

                </li>
                <li class="nav-item">
                
                    <Link class="nav-link" to="/conta">Conta</Link>
                
                </li>
                <li class="nav-item">

                    <a><Logout/></a>

                </li>

            </ul>
            <form class="d-flex" role="search" onSubmit={handleSearch}>

                <input class="form-control me-2" type="search" placeholder="..." aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button class="btn btn-outline-success" type="submit">Procurar</button>

            </form>
            </div>
        </div>
        </nav>

    );
}

export default NavBar;