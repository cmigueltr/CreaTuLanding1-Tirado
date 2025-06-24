import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
    const { getTotalItems } = useContext(CartContext);
    const totalItems = getTotalItems();

    return (
        <div className="cart-widget">
            <span className="cart-icon" role="img" aria-label="Carrito">🛒</span>
            <span className="cart-count">{totalItems}</span>
        </div>
    )
}

export default CartWidget;