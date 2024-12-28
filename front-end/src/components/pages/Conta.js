import { useState, useEffect } from "react";
import NavBar from "../Forms/NavBar";

function Conta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAntiga, setPasswordAntiga] = useState('');
    const [passwordNova, setPasswordNova] = useState('');
    const [passwordProgress, setPasswordProgress] = useState(0);  // Para armazenar a porcentagem do progresso da senha
    const [htmlProgessTextColor, sethtmlProgessTextColor] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('userInfo');
        if (userData) {
            const user = JSON.parse(userData);
            setNome(user.name);
            setEmail(user.email);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const formatPassword = (d) => {
        let progress = 0;
        let textProgress = ""

        // Verifica se a senha contém pelo menos uma letra
        if (/(?=.*[A-Za-z])/.test(d)) {
            progress += 25;
            textProgress = "danger"
        }

        // Verifica se a senha contém pelo menos um número
        if (/(?=.*\d)/.test(d)) {
            progress += 25;
            textProgress = "danger"
        }

        // Verifica se a senha contém pelo menos um caractere especial
        if (/(?=.*[!@#$%^&*()_+\-=\\[\]{};':\"\\\\|,.<>\\/?])/.test(d)) {
            progress += 25;
            textProgress = "danger"
        }

        // Verifica se a senha contém pelo menos um desses caracteres (letra, número ou especial)
        if (/.+$/.test(d)) {
            progress += 25;
            textProgress = "danger"

        }

        // Verifica se o progresso chegou a 100% e muda a cor para 'success'
        if (progress === 100) {
            textProgress = "success"; // Cor final quando o progresso atinge 100%
        }

        // Atualiza o progresso da senha
        setPasswordProgress(progress);
        sethtmlProgessTextColor(textProgress)

    };

    return (
        <div>
            <NavBar />

            <div className="container">
                <h2>Minha Conta</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campo Nome */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nome</span>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>

                    {/* Campo Email */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2">Email</span>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Recipient's email"
                            aria-describedby="basic-addon2"
                        />
                    </div>

                    {/* Campo Senha 1 */}
                    <div className="row g-3 align-items-center mb-3">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Senha antiga</label>
                        </div>
                        <div className="col-auto">
                            <input
                                type="password"
                                id="inputPassword6"
                                className="form-control"
                                value={passwordAntiga}
                                onChange={(e) => setPasswordAntiga(e.target.value)}
                                aria-describedby="passwordHelpInline"
                            />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Deve ter de 8 a 200 caracteres.
                            </span>
                        </div>
                    </div>

                    {/* Campo Senha 2 */}
                    <div className="row g-3 align-items-center mb-3">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Senha nova</label>
                        </div>
                        <div className="col-auto">
                            <input
                                type="password"
                                id="inputPassword6"
                                className="form-control"
                                value={passwordNova}
                                onChange={(e) => {
                                    setPasswordNova(e.target.value);
                                    formatPassword(e.target.value);  // Atualiza o progresso enquanto digita
                                }}
                                aria-describedby="passwordHelpInline"
                            />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Letra, Numero e Caracteres especiais 
                            </span>
                        </div>
                    </div>

                    
                    <div className="progress" role="progressbar" aria-label="Password strength" aria-valuenow={passwordProgress} aria-valuemin="0" aria-valuemax="100">
                        <div className={`progress-bar bg-${htmlProgessTextColor}`} style={{ width: `${passwordProgress}%` }}>{passwordProgress}</div>
                    </div>

                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </form>
            </div>
        </div>
    );
}

export default Conta;
