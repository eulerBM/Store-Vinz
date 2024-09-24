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

        {/* Rotas públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         {/* Rotas protegidas */}
         <Route 
          path="/user" 
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/user/change_password" 
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>

  );
}

export default App;
