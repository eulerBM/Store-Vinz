import '../../css/HomeCss.css';
import Logout from '../pages/outh/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Carrinho from '../utils/Carrinho';
import '../../css/FormLogin.css';

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { length } = Carrinho();
    const navigate = useNavigate();

    const getIdPublicUser = JSON.parse(localStorage.getItem("userInfo"));
    const idPublicUserOrFalse = getIdPublicUser && getIdPublicUser.idPublic ? getIdPublicUser.idPublic : false;

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && ["ADMIN", "SUPER"].includes(userInfo.role)) {
            console.log("É ADMIN")
            setIsAdmin(true);
        } else {
            console.log("não é admin")
            setIsAdmin(false);
        }
    }, []);

    function CarrinhoButton() {
        navigate('/carrinho');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?nameProducts=${searchTerm}&page=0`);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
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

                        {isAdmin ? (
                            // Exibe rotas para administradores
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/conta">Conta</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/criar_produto">Publicar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/meus_publicados">Meus publicados</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/chat">Suporte Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Logout />
                                </li>
                            </>
                        ) : isLoggedIn ? (
                            // Exibe rotas para usuários que não são administradores
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/conta">Conta</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/criar_produto">Publicar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/meus_publicados">Meus publicados</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/chat">Suporte</Link>
                                </li>
                                <li className="nav-item">
                                    <Logout />
                                </li>
                            </>
                        ) : (
                            // Exibe rotas para usuários não logados
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Entrar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Registrar</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <button type="button" className="btn btn-primary position-relative" onClick={CarrinhoButton}>
                        Carrinho
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {length(idPublicUserOrFalse)}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </button>

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
