import './App.css';
import Login from './components/pages/outh/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/pages/outh/Register';
import ChangePassword from './components/pages/outh/ChangePassword';
import Conta from './components/pages/Conta';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './components/pages/Search';
import CreateProduct from './components/pages/CreateProduct';

function App() {

  return (

    <Router>
      <Routes>

        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<Search />} />

         {/* Rotas protegidas */}
         <Route 
          path="/conta" 
          element={
            <ProtectedRoute>
              <Conta />
            </ProtectedRoute>
          } 
        />

          <Route 
          path="/criar_produto" 
          element={
            <ProtectedRoute>
              <CreateProduct />
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