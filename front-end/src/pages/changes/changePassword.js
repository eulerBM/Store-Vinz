import NavBar from "../../components/navbar/NavBar";
import { useState } from 'react';
import '../changes/changePassword.css';
import changePassword from "../../utils/changePassword";
import changePasswordService from "../../services/changePasswordService";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [msgError, setMsgError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne recarregamento da página ao enviar o formulário
        setMsgError(null);

        const validPass = changePassword.validPassword(newPassword, oldPassword);

        if (validPass !== true) {
            setMsgError(validPass);
            return;
        }

        setLoading(true);

        try {
            const response = await changePasswordService.changePassword(newPassword, oldPassword);

            if (response === true) {
                alert("Senha alterada com sucesso!");
                setNewPassword("");
                setOldPassword("");
            } else {
                setMsgError(response.message || "Erro ao alterar a senha.");
            }
        } catch (error) {
            setMsgError("Erro inesperado, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />

            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">Nova senha</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <div id="passwordHelpBlock" className="form-text">
                            Sua senha deve ter de 5 a 50 caracteres, conter letras, números e caracteres especiais e não deve conter espaços ou emojis.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">Senha atual</label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="form-control"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>

                    {msgError && <div className="alert alert-danger">{msgError}</div>}

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
