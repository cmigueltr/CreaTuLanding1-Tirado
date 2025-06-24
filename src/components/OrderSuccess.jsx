import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import { LoadingContext } from '../context/LoadingContext';
import '../css/OrderSuccess.css';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { setIsLoading } = useContext(LoadingContext);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) {
                setError(true);
                return;
            }

            setIsLoading(true);
            try {
                const orderRef = doc(db, 'ordenes', orderId);
                const orderSnap = await getDoc(orderRef);

                if (orderSnap.exists()) {
                    setOrder({
                        id: orderSnap.id,
                        ...orderSnap.data()
                    });
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error al obtener la orden:', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, setIsLoading]);

    if (error) {
        return (
            <div className="order-error">
                <div className="error-icon">❌</div>
                <h2>Orden no encontrada</h2>
                <p>La orden que buscas no existe o ha sido removida.</p>
                <button onClick={() => navigate('/')} className="back-home-btn">
                    🏠 Volver al inicio
                </button>
            </div>
        );
    }

    if (!order) {
        return null; // El LoadingSpinner se mostrará
    }

    // Formatear fecha
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Fecha no disponible';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="order-success-container">
            <div className="order-success-content">
                <div className="success-header">
                    <div className="success-icon">✅</div>
                    <h1>¡Compra Exitosa!</h1>
                    <p className="success-message">
                        Muchas gracias por tu compra. En breve nos estaremos comunicando contigo.
                    </p>
                </div>

                <div className="order-details">
                    <div className="order-info">
                        <h2>Detalles de la Orden</h2>
                        <div className="order-id">
                            <strong>ID de Orden:</strong> {order.id}
                        </div>
                        <div className="order-date">
                            <strong>Fecha:</strong> {formatDate(order.fecha)}
                        </div>
                        <div className="order-status">
                            <strong>Estado:</strong> 
                            <span className={`status-badge ${order.estado}`}>
                                {order.estado === 'pendiente' ? 'Pendiente' : order.estado}
                            </span>
                        </div>
                    </div>

                    <div className="customer-info">
                        <h3>Datos del Cliente</h3>
                        <div className="customer-details">
                            <p><strong>Nombre:</strong> {order.comprador.name}</p>
                            <p><strong>Email:</strong> {order.comprador.email}</p>
                            <p><strong>Teléfono:</strong> {order.comprador.phone}</p>
                            <p><strong>Dirección:</strong> {order.comprador.address}</p>
                            <p><strong>Ciudad:</strong> {order.comprador.city}</p>
                            {order.comprador.zipCode && (
                                <p><strong>Código Postal:</strong> {order.comprador.zipCode}</p>
                            )}
                        </div>
                    </div>

                    <div className="order-items-summary">
                        <h3>Productos Comprados</h3>
                        <div className="items-list">
                            {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.img} alt={item.name} className="item-image" />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p className="item-price">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-total">
                        <h3>Total de la Compra</h3>
                        <div className="total-amount">${order.total}</div>
                    </div>
                </div>

                <div className="success-actions">
                    <button onClick={() => navigate('/')} className="back-home-btn">
                        🏠 Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess; 