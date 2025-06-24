import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import '../css/Checkout.css';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useForm } from 'react-hook-form';

const Checkout = () => {
    const { cart, getTotal, clearCart } = useContext(CartContext);
    const { userData, user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '', email: '', phone: '', address: '', city: '', zipCode: ''
        }
    });
    const [saveAddress, setSaveAddress] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user && userData) {
            setValue('name', userData.name || '');
            setValue('email', user.email || '');
            setValue('address', userData.address || '');
        }
    }, [user, userData, setValue]);

    const total = getTotal();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Crear objeto de orden
            const orden = {
                comprador: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    zipCode: data.zipCode
                },
                items: cart,
                total: total,
                fecha: serverTimestamp(),
                estado: 'pendiente'
            };
            // Guardar orden en Firebase
            const ordenRef = await addDoc(collection(db, 'ordenes'), orden);
            // Si el usuario quiere guardar la dirección, actualizar en Firestore
            if (user && saveAddress) {
                await updateDoc(doc(db, 'users', user.uid), {
                    address: data.address
                });
                Swal.fire({
                  icon: 'success',
                  title: '¡Dirección guardada!',
                  text: 'Tu dirección se ha guardado como predeterminada.',
                  confirmButtonColor: '#e6007e',
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  color: '#333',
                  customClass: {
                    popup: 'swal2-bizzco',
                    confirmButton: 'swal2-bizzco-btn'
                  }
                });
            }
            clearCart();
            await Swal.fire({
              icon: 'success',
              title: '¡Compra realizada!',
              text: 'Tu pedido fue registrado correctamente.',
              confirmButtonColor: '#e6007e',
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              color: '#333',
              customClass: {
                popup: 'swal2-bizzco',
                confirmButton: 'swal2-bizzco-btn'
              }
            });
            navigate(`/order-success/${ordenRef.id}`);
        } catch (error) {
            console.error('Error al crear la orden:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.',
              confirmButtonColor: '#e6007e',
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              color: '#333',
              customClass: {
                popup: 'swal2-bizzco',
                confirmButton: 'swal2-bizzco-btn'
              }
            });
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>No hay productos en el carrito</h2>
                <p>Agrega productos antes de finalizar la compra</p>
                <button onClick={() => navigate('/')} className="back-to-shop-btn">
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <h1>Finalizar Compra</h1>
                <div className="checkout-grid">
                    {/* Formulario de datos */}
                    <div className="checkout-form-section">
                        <h2>Datos de Contacto</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre completo *</label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: 'El nombre es obligatorio' })}
                                />
                                {errors.name && <span className="form-error">{errors.name.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email', { required: 'El email es obligatorio', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email no válido' } })}
                                    disabled={!!user}
                                />
                                {errors.email && <span className="form-error">{errors.email.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Teléfono *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register('phone', { required: 'El teléfono es obligatorio', pattern: { value: /^[0-9\-\+\s]+$/, message: 'Teléfono no válido' } })}
                                />
                                {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Dirección *</label>
                                <input
                                    type="text"
                                    id="address"
                                    {...register('address', { required: 'La dirección es obligatoria' })}
                                />
                                {errors.address && <span className="form-error">{errors.address.message}</span>}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">Ciudad *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        {...register('city', { required: 'La ciudad es obligatoria' })}
                                    />
                                    {errors.city && <span className="form-error">{errors.city.message}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zipCode">Código Postal</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        {...register('zipCode')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={saveAddress}
                                        onChange={e => setSaveAddress(e.target.checked)}
                                    />
                                    Guardar dirección como predeterminada
                                </label>
                            </div>
                            <button type="submit" className="submit-order-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                            </button>
                        </form>
                    </div>
                    {/* Resumen del pedido */}
                    <div className="order-summary-section">
                        <h2>Resumen del Pedido</h2>
                        <div className="order-items">
                            {cart.map((item) => (
                                <div key={item.id} className="order-item">
                                    <img src={item.img} alt={item.name} className="order-item-image" />
                                    <div className="order-item-details">
                                        <h4>{item.name}</h4>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p className="order-item-price">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <h3>Total: ${total}</h3>
                        </div>
                        <button 
                            onClick={() => navigate('/cart')} 
                            className="back-to-cart-btn"
                        >
                            ← Volver al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;