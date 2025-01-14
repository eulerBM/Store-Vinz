import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/outh/Login';
import Register from './pages/outh/Register';
import ChangePassword from './pages/changes/changePassword';
import Conta from './pages/conta/Conta';
import ProtectedRoute from './protectRoutes/ProtectedRoute'
import ProtectedRouteAdmin from './protectRoutes/ProtectedRouteAdmin'
import Search from './pages/search/Search';
import CreateProduct from './pages/product/CreateProduct';
import Product from './pages/product/Product';
import MyPubli from './pages/myPublication/MyPubli';
import CarrinhoPage from './pages/carrinho/CarrinhoPage';
import Chat from './pages/chat/chat';
import ChatAdmin from './pages/chat/admin/chatAdmin';
import Home from './pages/home/home';

function App() {

  return (

    <Router>
      <Routes>

        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/get/:idPublic" element={<Product />} />
        <Route path="/chat" element={<Chat />} />

         {/* Rotas protegidas */}
        <Route path="/conta" element={<ProtectedRoute> <Conta/> </ProtectedRoute>}/>
        <Route path="/meus_publicados" element={<ProtectedRoute> <MyPubli/> </ProtectedRoute>}/>
        <Route path="/carrinho" element={<ProtectedRoute> <CarrinhoPage/></ProtectedRoute>}/>
        <Route path="/criar_produto" element={<ProtectedRoute> <CreateProduct/> </ProtectedRoute>}/>
        <Route path="/user/change/password" element={<ProtectedRoute> <ChangePassword/> </ProtectedRoute>}/>

        {/* Rotas de ADMINS e SUPERS*/}
        <Route path="/admin/chat" element={<ProtectedRouteAdmin> <ChatAdmin/> </ProtectedRouteAdmin>}/>

      </Routes>
    </Router>

  );
}

export default App;
