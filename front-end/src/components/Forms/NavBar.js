import '../../css/HomeCss.css';
import Logout from '../pages/outh/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../css/FormLogin.css';

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Hook para navegação programática

    // Função para tratar a busca
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Redireciona para a página de busca com o termo de busca como query param
            navigate(`/search?name=${searchTerm}`);
        }
    };

    useEffect(() => {
        // Verifica se o token existe no localStorage ou outro mecanismo de autenticação
        const token = localStorage.getItem('token'); // Pode ser 'authToken', depende do que você usa
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

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
                            <Link className="nav-link" to="/criar_produto">Publicar</Link>
                        </li>

                        {isLoggedIn && ( // Renderiza o Logout somente se o usuário estiver logado
                            <li className="nav-item">
                                <a><Logout /></a>
                            </li>
                        )}
                    </ul>

                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">Procurar</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;