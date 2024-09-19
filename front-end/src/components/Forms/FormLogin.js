import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

        <form onSubmit={handleSubmit}>

            <h1>Login</h1>

            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <br/>

            <input type="password" name="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

            <br/>

            <button type="submit">Entrar</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </form>
    )  
}

export default FormLogin;
