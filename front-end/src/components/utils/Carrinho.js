import { useState, useEffect } from 'react';


function Carrinho() {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart_");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    function add(idPublic, userInfo) {
        
        const isAnonymous = !userInfo;
        const cartKey = isAnonymous ? "cart_" : `cart_${userInfo.idPublic}`;

        const isItemInCart = cartItems.includes(idPublic);
        if (isItemInCart)return;
    
    
        const updatedCart = [...cartItems, idPublic];
        setCartItems(updatedCart);
    
        
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    
        
        if (!isAnonymous) {

            localStorage.removeItem("cart_");

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

export default Carrinho;
