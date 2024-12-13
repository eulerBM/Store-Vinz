import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/FormLogin.css';
import Carrinho from '../utils/Carrinho';
import { Link } from "react-router-dom";
import axios from 'axios';

function FormLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { renameLocalStorageKeyCart } = Carrinho();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: email,
                senha: senha
            });

            if (response.status === 200) {
                const { acessToken, expiresIn, user } = response.data;

                if (!acessToken) {
                    return navigate('/login');
                }

                localStorage.setItem('token', acessToken);
                localStorage.setItem('userInfo', JSON.stringify(user));
                renameLocalStorageKeyCart(user.idPublic);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Email ou senha incorretos');
            } else {
                setErrorMessage('Erro ao tentar fazer login. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <div className="page">
            <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css"></link>
            <form onSubmit={handleSubmit} className="formLogin">
                <h1>Login</h1>
                <p>Digite os seus dados de acesso no campo abaixo.</p>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Senha</label>
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <span className="lnr lnr-eye" id="olho" onClick={togglePasswordVisibility}></span>
                </div>

                <a href="/">Esqueci minha senha</a>
                <Link to="/register">Cadastrar-me</Link>

                <input type="submit" value="Acessar" className="btn" />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>

    );
}

export default FormLogin;
