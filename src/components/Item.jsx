import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Item.css';
import ItemCount from './ItemCount';

const Item = ({ id, title, price, description, image, stock }) => {
    const handleAddToCart = (quantity) => {
        console.log(`Agregando ${quantity} unidades de ${title} al carrito`);
    };

    return (
        <div className="item-card">
            <img src={image} alt={title} className="item-image" />
            <h3 className="item-title">{title}</h3>
            <p className="item-price">${price}</p>
            <p className="item-description">{description}</p>
            <p className="item-stock">Stock disponible: {stock}</p>
            <div className="item-buttons">
                <ItemCount 
                    stock={stock} 
                    initial={1} 
                    onAdd={handleAddToCart} 
                />
                <Link to={`/item/${id}`} className="view-details">
                    Ver detalles
                </Link>
            </div>
        </div>
    );
};

export default Item; 