import { useState, useEffect } from 'react';

function CarrinhoAnonymous() {

    const [cartItems, setCartItems] = useState([]);

    function add(idPublic, idUser) {
    
        const userCartKey = `cart_Anonymous${idUser}`;
        
        const itemExists = cartItems.some(item => item.idPublic === idPublic);
    
        
        if (!itemExists) {
            const updatedCart = [...cartItems, { idPublic }]; 
            setCartItems(updatedCart); 
            localStorage.setItem(userCartKey, JSON.stringify(updatedCart)); 
        }
    }

    function remove(idPublic, idUser) {
        const userCartKey = `cart_${idUser}`;
        const updatedCart = cartItems.filter(item => item.idPublic !== idPublic);
        setCartItems(updatedCart);
        localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    }

    function length(idUser) {
        const userCartKey = `cart_${idUser}`;
        const existingCart = JSON.parse(localStorage.getItem(userCartKey));
        return existingCart ? existingCart.length : 0;
    }

    // Carrega o carrinho do localStorage na primeira vez que o componente é montado
    useEffect(() => {
        const idUser = localStorage.getItem('idUser'); // Certifique-se de ter o idUser salvo no localStorage
        const userCartKey = `cart_${idUser}`;
        const savedCart = JSON.parse(localStorage.getItem(userCartKey));
        if (savedCart) {
            setCartItems(savedCart);
        }
    }, []);

    return { add, remove, length, cartItems };
}

export default CarrinhoAnonymous;
