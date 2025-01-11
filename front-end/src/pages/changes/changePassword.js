import NavBar from "../../components/navbar/NavBar";
import { useState } from 'react';
import '../changes/changePassword.css';
import changePassword from "../../utils/changePassword";
import changePasswordService from "../../services/changePasswordService";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [msgError, setMsgError] = useState(null);
    const validPass = changePassword.validPassword(newPassword, oldPassword);

    const clickButton = () => {

        if (validPass === true){

            changePasswordService.changePassword(newPassword, oldPassword)

        }
    }

    return (
        <div>
            <NavBar />

            <div className="container mt-4">
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nova senha</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        aria-describedby="passwordHelpBlock"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div id="passwordHelpBlock" className="form-text">
                        Sua senha deve ter de 5 a 50 caracteres, conter letras, números e caracteres especiais e não deve conter espaços ou emojis.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Antiga senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <button type="button" onClick={clickButton} class="btn btn-primary">Salvar</button>

            </div>
        </div>
    );
}

export default ChangePassword;
