import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormRegister() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        try {

            const response = await axios.post('http://localhost:8080/auth/register', {
                nome: nome,
                email: email,
                password: senha
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
    
    return(

        <form onSubmit={handleSubmit}>

        <h1>Register</h1>

        <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />

        <br/>

        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <br/>

        <input type="password" name="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <br/>

        <button type="submit">Cadastrar</button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </form>

    )
}

export default FormRegister;