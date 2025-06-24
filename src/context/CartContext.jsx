import { createContext, useState, useEffect } from "react";
//creamos el contexto
export const CartContext = createContext();

//creamos el provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // funcion para agregar un item al carrito, no repite el item si ya existe y suma la cantidad
    const addItem = (item, quantity) => {
        console.log('Adding item to cart:', item, 'quantity:', quantity); // Debug
        
        if (isInCart(item.id)) {
            console.log('Item already in cart, updating quantity'); // Debug
            // Si el item existe, actualizamos su cantidad
            setCart(prevCart => prevCart.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity
                    };
                }
                return cartItem;
            }));
        } else {
            console.log('Adding new item to cart'); // Debug
            // Si el item no existe, lo agregamos al carrito
            setCart(prevCart => [...prevCart, { ...item, quantity }]);
        }
    }

    //funcion para eliminar un item del carrito
    const removeItem = (itemId) => {
        console.log('Removing item from cart:', itemId); // Debug
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    }

    //funcion para vaciar el carrito
    const clearCart = () => {
        console.log('Clearing cart'); // Debug
        setCart([]);
    }

    //funcion para obtener el total del carrito
    const getTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        console.log('Calculating total:', total); // Debug
        return total;
    }

    //funcion para obtener el total de items en el carrito
    const getTotalItems = () => {
        const total = cart.reduce((acc, item) => acc + item.quantity, 0);
        console.log('Calculating total items:', total); // Debug
        return total;
    }

    //funcion para saber si un item esta en el carrito
    const isInCart = (itemId) => {
        const exists = cart.some(item => item.id === itemId);
        console.log('Checking if item is in cart:', itemId, exists); // Debug
        return exists;
    }
    
    return(
        <CartContext.Provider value={{
            cart, 
            setCart, 
            addItem, 
            removeItem, 
            clearCart, 
            getTotal, 
            getTotalItems,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
    
