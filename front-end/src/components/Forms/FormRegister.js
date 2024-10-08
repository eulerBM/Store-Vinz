import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/FormLogin.css';
import axios from 'axios';

function FormRegister() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                nome: formData.nome,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Falha no cadastro. Verifique os dados e tente novamente.');
            } else {
                setErrorMessage('Erro ao tentar fazer cadastro. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <div class="page">

            <div className="form-container">

                        <form onSubmit={handleSubmit} class="formLogin">
                            <h2>Cadastro</h2>

                            
                            <label for="email">Nome</label>
                                <input 
                                    type="text" 
                                    id="nome" 
                                    name="nome" 
                                    value={formData.nome} 
                                    onChange={handleChange} 
                                    placeholder="Digite seu nome"
                                    required
                                />
                            
                                <label for="email">E-mail</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Digite seu email"
                                    required
                                />

                                <label for="password">Senha</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder="Digite sua senha"
                                    required
                                />

                            <input type="submit" value="Cadastrar" class="btn" />

                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                        </form>
                    </div>

        </div>
        
    );
}

export default FormRegister;
