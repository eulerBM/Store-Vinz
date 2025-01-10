import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import {Link} from 'react-router-dom';

function Conta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
   
    useEffect(() => {
        const userData = localStorage.getItem('userInfo');
        if (userData) {
            const user = JSON.parse(userData);
            setNome(user.name);
            setEmail(user.email);
        }
    }, []);


    return (
        <div>
            <NavBar />

            <div className="container">
                <h2>Minha Conta</h2>
                <form>
                
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

                    <div class="btn-group" role="group" aria-label="Default button group">
                        <Link className="btn btn-outline-primary" to="/user/change/password">Trocar senha</Link>
                    </div>  

                </form>
            </div>
        </div>
    );
}

export default Conta;
