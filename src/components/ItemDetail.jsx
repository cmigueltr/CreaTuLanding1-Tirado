import React, { useState } from 'react';
import '../css/Item.css';
import ItemCount from './ItemCount';

const ItemDetail = ({ detalle }) => {
    const [showCount, setShowCount] = useState(false);

    const handleAddToCart = (quantity) => {
        console.log(`Agregando ${quantity} unidades de ${detalle.name} al carrito`);
        setShowCount(false);
    };

    return (
        <div className="item-detail">
            <div className="item-detail-content">
                <div className="item-detail-image">
                    <img 
                        src={detalle.img || "https://via.placeholder.com/400x300?text=Producto"} 
                        alt={detalle.name} 
                    />
                </div>
                <div className="item-detail-info">
                    <h2 className="item-detail-title">{detalle.name}</h2>
                    <p className="item-detail-price">${detalle.price}</p>
                    <p className="item-detail-description">{detalle.description}</p>
                    <p className="item-detail-stock">Stock disponible: {detalle.stock}</p>
                    
                    {showCount ? (
                        <ItemCount 
                            stock={detalle.stock} 
                            onAdd={handleAddToCart}
                        />
                    ) : (
                        <button 
                            className="btn btn-primary add-to-cart"
                            onClick={() => setShowCount(true)}
                        >
                            Agregar al carrito
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
