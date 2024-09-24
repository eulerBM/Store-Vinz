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

        <form onSubmit={handleSubmit}>

            <div class="row mb-3">

                <label for="inputEmail3" class="col-sm-1 col-form-label">Email</label>
                <div class="col-sm-5">
                    <input type="email" name='email' placeholder="Email" value={email} class="form-control" id="inputEmail3" onChange={(e) => setEmail(e.target.value)}/>
                </div>

            </div>

            <div class="row mb-3">

                <label for="inputPassword3" class="col-sm-1 col-form-label">Password</label>
                <div class="col-sm-5">
                    <input type="password" name="password" placeholder="Senha" value={senha} class="form-control" id="inputPassword3" onChange={(e) => setSenha(e.target.value)}/>
                </div>

            </div>

            <button type="submit" class="btn btn-primary">Entrar</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </form>
    )  
}

export default FormLogin;
