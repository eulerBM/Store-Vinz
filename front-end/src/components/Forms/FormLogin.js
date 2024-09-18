import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormLogin () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
               
                navigate('/dashboard'); // Altere o caminho para a página que deseja redirecionar
            } else {
                
                setErrorMessage('Email ou senha incorretos');
            }
        } catch (error) {

            setErrorMessage('Erro ao tentar fazer login. Tente novamente mais tarde.');
        }
    }
    return (

        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br/>

            <input
                type="password"
                name="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br/>

            <button type="submit">Entrar</button>
        </form>
    )  

}

export default FormLogin;