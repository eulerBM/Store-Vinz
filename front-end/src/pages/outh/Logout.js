import { useNavigate } from 'react-router-dom';

function Logout () {

    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        navigate('/login');

    return (

        <button onClick={handleLogout}>
            Sair
        </button>

    );

}

export default Logout;