import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../mock/AsyncService';
import ItemDetail from './ItemDetail';

export const ItemDetailContainer = () => {
    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        console.log('Iniciando la obtención de productos...');
        getProducts()
            .then((respuesta) => {
                console.log('Respuesta recibida:', respuesta);
                const producto = respuesta.find(producto => producto.id === id);
                console.log('Producto encontrado:', producto);
                setDetalle(producto);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading-container">Cargando...</div>;
    }

    if (!detalle) {
        return <div className="error-container">No se encontró el producto</div>;
    }

    return (
        <div className="detail-container">
            <ItemDetail detalle={detalle} />
        </div>
    );
};

export default ItemDetailContainer;