import React from 'react'
import { Link } from 'react-router-dom'
import '../css/EmptyCart.css'

export const EmptyCart = () => {
  return (
    <div className="empty-cart-container">
        <div className="empty-cart-content">
            <h1>Carrito vacío</h1>
            <p>No hay productos en el carrito</p>
            <Link to="/" className="back-to-home">
                Volver a la página principal
            </Link>
        </div>
    </div>
  )
}

export default EmptyCart
