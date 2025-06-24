import React from 'react'
import { Link } from 'react-router-dom'
import '../css/CartView.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const CartView = ({ totalItems, total, clearCart, cart, removeItem }) => {
  const handleClearCart = () => {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: '¿Estás seguro de que deseas eliminar todos los productos del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e6007e',
      cancelButtonColor: '#62c2d2',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
      color: '#333',
      customClass: {
        popup: 'swal2-bizzco',
        confirmButton: 'swal2-bizzco-btn',
        cancelButton: 'swal2-bizzco-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart()
        Swal.fire({
          icon: 'success',
          title: 'Carrito vaciado',
          text: 'Todos los productos fueron eliminados.',
          confirmButtonColor: '#e6007e',
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          color: '#333',
          customClass: {
            popup: 'swal2-bizzco',
            confirmButton: 'swal2-bizzco-btn'
          }
        })
      }
    })
  }

  const handleRemoveItem = (id) => {
    removeItem(id)
    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado',
      text: 'El producto fue eliminado del carrito.',
      confirmButtonColor: '#e6007e',
      background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
      color: '#333',
      customClass: {
        popup: 'swal2-bizzco',
        confirmButton: 'swal2-bizzco-btn'
      }
    })
  }

  return (
    <div className="cart-view-container">
        <h1>Carrito</h1>
        <div className="cart-items">
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${item.price}</p>
                        <p>Subtotal: ${item.price * item.quantity}</p>
                    </div>
                    <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-item-btn"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
        <div className="cart-summary">
            <p>Total de items: {totalItems}</p>
            <p className="cart-total">Total: ${total}</p>
            <button onClick={handleClearCart} className="clear-cart-btn">
                Vaciar carrito
            </button>
            <Link to="/checkout" className="checkout-btn">
                🛒 Finalizar compra
            </Link>
        </div>
    </div>
  )
}

export default CartView