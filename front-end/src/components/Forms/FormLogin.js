import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/FormLogin.css';
import axios from 'axios';

function FormLogin () {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        try {

            const response = await axios.post('http://localhost:8080/auth/login', {
                email: email,
                senha: senha
            });

            if (response.status === 200) {
            
                const data = response.data;

                const { acessToken, expiresIn, user } = response.data;

                if (!acessToken){

                    return navigate('/login')

                }

                localStorage.setItem('token', acessToken);
                localStorage.setItem('userInfo', JSON.stringify(user));

                navigate('/home'); 

            }
        } catch (error) {
            
            if (error.response && error.response.status === 401) {
            
                setErrorMessage('Email ou senha incorretos');

            } else {
      
                setErrorMessage('Erro ao tentar fazer login. Tente novamente mais tarde.');
            }
        }
    }

    return (

        <div class="page">

            <form onSubmit={handleSubmit} class="formLogin">

                <h1>Login</h1>
                <p>Digite os seus dados de acesso no campo abaixo.</p>
                <label for="email">E-mail</label>

                    <input type="email" name='email' placeholder="Digite seu e-mail" autofocus="true" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label for="password">Senha</label>

                    <input type="password" name='password' placeholder="Digite seu e-mail" value={senha} onChange={(e) => setSenha(e.target.value)} />

                <a href="/">Esqueci minha senha</a>

                    <input type="submit" value="Acessar" class="btn" />

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </form>

        </div>
    )  
}

export default FormLogin;
