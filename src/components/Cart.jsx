//importamos el contexto
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import EmptyCart from './EmptyCart'
import CartView from './CartView'

const Cart = () => {
    const { cart, clearCart, removeItem, getTotal, getTotalItems } = useContext(CartContext);
    const total = getTotal();
    const totalItems = getTotalItems();

    console.log('Cart - cart:', cart);
    console.log('Cart - total:', total);
    console.log('Cart - totalItems:', totalItems);

    if (!cart || cart.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="cart-container">
            <CartView 
                cart={cart}
                totalItems={totalItems}
                total={total}
                clearCart={clearCart}
                removeItem={removeItem}
            />
        </div>
    );
}

export default Cart;