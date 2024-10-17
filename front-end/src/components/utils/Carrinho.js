import { useState, useEffect } from 'react';

function Carrinho() {
    const [cartItems, setCartItems] = useState([]);

    function add(idPublic) {
        const existingItem = cartItems.find(item => item.idPublic === idPublic);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.idPublic === idPublic ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { idPublic, quantity: 1 }]);
        }
    }

    function remove(idPublic) {
        setCartItems(cartItems.filter(item => item.idPublic !== idPublic));
    }

    function length() {
        return cartItems.length;
    }

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCartItems(savedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return { add, remove, length, cartItems };
}

export default Carrinho;
