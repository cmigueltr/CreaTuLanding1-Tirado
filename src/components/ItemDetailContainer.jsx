import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { LoadingContext } from '../context/LoadingContext';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../service/firebase';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const ItemDetailContainer = () => {
    const [detalle, setDetalle] = useState(null);
    const { setIsLoading } = useContext(LoadingContext);
    const [invalid, setInvalid] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        console.log('Obteniendo producto con ID:', id);
        setIsLoading(true);
        
        // Conectamos con nuestra colección
        const productsCollection = collection(db, 'productos');
        // Crear una referencia al documento que queremos traer
        const docRef = doc(productsCollection, id);
        
        // Traer un documento
        getDoc(docRef)
            .then((res) => {
                if (res.exists()) {
                    console.log('Producto encontrado:', res.data());
                    setDetalle({ ...res.data(), id: res.id });
                } else {
                    console.log('Producto no encontrado');
                    setInvalid(true);
                    Swal.fire({
                        icon: 'error',
                        title: '¡Producto no encontrado!',
                        text: 'El producto que buscas no existe o ha sido removido.',
                        confirmButtonColor: '#e6007e',
                        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                        color: '#333',
                        customClass: {
                            popup: 'swal2-bizzco',
                            confirmButton: 'swal2-bizzco-btn'
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error al obtener el producto:', error);
                setInvalid(true);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al obtener el producto. Intenta nuevamente.',
                    confirmButtonColor: '#e6007e',
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                    color: '#333',
                    customClass: {
                        popup: 'swal2-bizzco',
                        confirmButton: 'swal2-bizzco-btn'
                    }
                });
            })
            .finally(() => setIsLoading(false));
    }, [id, setIsLoading]);

    if (invalid) {
        return (
            <div className="error-container">
                <div className="error-icon">❌</div>
                <h2>¡Producto no encontrado!</h2>
                <p className="error-message">
                    Lo sentimos, el producto que buscas no existe o ha sido removido de nuestro catálogo.
                </p>
                <Link to="/" className="back-home-link">
                    🏠 Volver al inicio
                </Link>
            </div>
        );
    }

    if (!detalle) {
        return null; // El LoadingSpinner se mostrará mientras carga
    }

    return (
        <div className="detail-container">
            <ItemDetail detalle={detalle} />
        </div>
    );
};

export default ItemDetailContainer;