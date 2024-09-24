import './App.css';
import Login from './pages/outh/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/outh/Register';
import ChangePassword from './pages/outh/ChangePassword';
import User from './pages/User';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/change_password" element={<ChangePassword />} />
      </Routes>
    </Router>

  );
}

export default App;
