import Logout from '../pages/outh/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Carrinho from '../utils/Carrinho';
import '../../css/FormLogin.css';
import '../../css/Navbar.css';
import NavBarEffect from '../../effect/NavBarEffect';

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { length } = Carrinho();
    const navigate = useNavigate();
    const location = useLocation();

    const getIdPublicUser = JSON.parse(localStorage.getItem("userInfo"));
    const idPublicUserOrFalse = getIdPublicUser && getIdPublicUser.idPublic ? getIdPublicUser.idPublic : false;

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setIsAdmin(userInfo && ["ADMIN", "SUPER"].includes(userInfo.role));
    }, []);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand">Store-Vinz</a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={isActive("/")} to="/">Principal</Link>
                        </li>
                        {isAdmin ? (
                            <>
                                <li className="nav-item">
                                    <Link className={isActive("/conta")} to="/conta">Conta</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/criar_produto")} to="/criar_produto">Publicar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/meus_publicados")} to="/meus_publicados">Meus publicados</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/admin/chat")} to="/admin/chat">Suporte Admin</Link>
                                </li>
                                <li className="nav-item"><Logout /></li>
                            </>
                        ) : isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className={isActive("/conta")} to="/conta">Conta</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/criar_produto")} to="/criar_produto">Publicar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/meus_publicados")} to="/meus_publicados">Meus publicados</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/chat")} to="/chat">Suporte</Link>
                                </li>
                                <li className="nav-item"><Logout /></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className={isActive("/login")} to="/login">Entrar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive("/register")} to="/register">Registrar</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <button type="button" id='btnCard' className="btn btn-primary position-relative" onClick={() => navigate('/carrinho')}>
                        Carrinho
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {length(idPublicUserOrFalse)}
                        </span>
                    </button>
                    <form className="d-flex" role="search" id='inputSearch' onSubmit={(e) => {e.preventDefault(); if (searchTerm.trim()) navigate(`/search?nameProducts=${searchTerm}&page=0`);}}>
                        <input className="form-control me-2" type="search" onClick={NavBarEffect.inputIncreaseSize} onBlur={NavBarEffect.inputReturnNormal} placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit">Procurar</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
