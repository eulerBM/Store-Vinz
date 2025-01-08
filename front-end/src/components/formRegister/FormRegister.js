import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../formLogin/FormLogin.css'
import axios from 'axios';

function FormRegister() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        password2: ''

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

            if (formData.password !== formData.password2) {
                setErrorMessage("As senhas não são iguais!");
                return;
            }

            const response = await axios.post('http://192.168.3.103:8080/auth/register', {
                nome: formData.nome,
                email: formData.email,
                password: formData.password,
                password2: formData.password2
            });

            if (response.status === 200) {
                navigate('/login');
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
        <div className="page">

            <div className="form-container">

                <form onSubmit={handleSubmit} className="formLogin">
                    <h2>Cadastro</h2>

                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        required
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu email"
                        required
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        required
                    />

                    <label htmlFor="password2">Repetir senha</label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        required
                    />

                    <input type="submit" value="Cadastrar" className="btn" />

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                </form>
            </div>
        </div>
    );
}

export default FormRegister;
