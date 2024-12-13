import { useNavigate } from 'react-router-dom';

function Logout () {

    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.clear();

        navigate('/login');

    }

    return (

        <button className="nav-link" onClick={handleLogout}>
            Sair
        </button>

    );
}

export default Logout;