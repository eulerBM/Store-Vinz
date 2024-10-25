import { useState, useEffect } from 'react';
import Anonymous from './Anonymous';

function Carrinho() {

    const anonymous = Anonymous(); 
    const nameStorageAnony = anonymous.IdGenerator();
    const [cartItems, setCartItems] = useState([]);
    

    function add(idPublic, userInfo) {

        let nameStorage = `cart_` + userInfo

        console.log(userInfo)
 
        if ( userInfo === false ){

            nameStorage = `cart_anonymous_` + nameStorageAnony


        }

    


        
        const itemExists = cartItems.some(item => item.idPublic === idPublic);


        const updatedCart = [...cartItems, { idPublic }]; 

        setCartItems(updatedCart); 
            
        localStorage.setItem("", JSON.stringify(updatedCart));  
            
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
