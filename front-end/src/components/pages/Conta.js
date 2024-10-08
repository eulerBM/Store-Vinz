import { useState, useEffect } from "react";
import NavBar from "../Forms/NavBar";

function Conta() {
    // Estados para armazenar os valores dos inputs
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
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
        console.log("Dados atualizados:", { nome, email, password });
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

                    {/* Campo Senha */}
                    <div className="row g-3 align-items-center mb-3">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input 
                                type="password" 
                                id="inputPassword6" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                aria-describedby="passwordHelpInline" 
                            />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Deve ter de 1 a 300 caracteres.
                            </span>
                        </div>
                    </div>

                    {/* Botão para enviar */}
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </form>
            </div>
        </div>
    );
}

export default Conta;
