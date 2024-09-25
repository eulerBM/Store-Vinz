import { useNavigate } from 'react-router-dom';

function Logout () {

    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        navigate('/login');

    }

    return (

        <button class="nav-link" onClick={handleLogout}>
            Sair
        </button>

    );
}

export default Logout;