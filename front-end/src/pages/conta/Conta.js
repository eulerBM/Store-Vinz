import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";

function Conta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAntiga, setPasswordAntiga] = useState('');
    const [passwordNova, setPasswordNova] = useState('');
    const [passwordProgress, setPasswordProgress] = useState(0); // Progresso da senha
    const [htmlProgessTextColor, sethtmlProgessTextColor] = useState('');
    const [mensagem, setMensagem] = useState(''); // Para mensagens de sucesso ou erro

    useEffect(() => {
        const userData = localStorage.getItem('userInfo');
        if (userData) {
            const user = JSON.parse(userData);
            setNome(user.name);
            setEmail(user.email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!passwordAntiga || !passwordNova) {
            setMensagem("Ambas as senhas são obrigatórias!");
            return;
        }

        // Cria o payload para a API
        const payload = {
            senhaAntiga: passwordAntiga,
            senhaNova: passwordNova,
        };

        try {
            const token = localStorage.getItem('token'); // Obtem o token do localStorage
            const response = await axios.post(
                'http://192.168.3.103:8080/auth/change_Password',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                    },
                }
            );

            setMensagem("Senha atualizada com sucesso!");
            setPasswordAntiga('');
            setPasswordNova('');
            setPasswordProgress(0);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMensagem(error.response.data.message);
            } else {
                setMensagem("Erro ao atualizar a senha.");
            }
        }
    };

    const formatPassword = (d) => {
        let progress = 0;
        let textProgress = "";

        if (/(?=.*[A-Za-z])/.test(d)) progress += 25;
        if (/(?=.*\d)/.test(d)) progress += 25;
        if (/(?=.*[!@#$%^&*()_+\-=\\[\]{};':\"\\\\|,.<>\\/?])/.test(d)) progress += 25;
        if (/.+$/.test(d)) progress += 25;

        if (progress === 100) textProgress = "success";
        else textProgress = "danger";

        setPasswordProgress(progress);
        sethtmlProgessTextColor(textProgress);
    };

    return (
        <div>
            <NavBar />

            <div className="container">
                <h2>Minha Conta</h2>
                <form onSubmit={handleSubmit}>
                    {/* Mensagem de feedback */}
                    {mensagem && <div className="alert alert-info">{mensagem}</div>}

                    <div className="input-group mb-3">
                        <span className="input-group-text">Nome</span>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha antiga</label>
                        <input
                            type="password"
                            className="form-control"
                            value={passwordAntiga}
                            onChange={(e) => setPasswordAntiga(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha nova</label>
                        <input
                            type="password"
                            className="form-control"
                            value={passwordNova}
                            onChange={(e) => {
                                setPasswordNova(e.target.value);
                                formatPassword(e.target.value);
                            }}
                        />
                        <div className="progress" style={{ height: '5px' }}>
                            <div
                                className={`progress-bar bg-${htmlProgessTextColor}`}
                                style={{ width: `${passwordProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Conta;
