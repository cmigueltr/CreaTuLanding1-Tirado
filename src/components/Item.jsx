import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Item.css';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';

const Item = ({ id, name, price, description, img, stock }) => {
    const { addItem } = useContext(CartContext);

    const handleAddToCart = (quantity) => {
        console.log(`Agregando ${quantity} unidades de ${name} al carrito`);
        addItem({ id, name, price, description, img, stock }, quantity);
    };

    return (
        <div className="item-card">
            <img src={img} alt={name} className="item-image" />
            <div className="item-content">
                <h3 className="item-title">{name}</h3>
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
        </div>
    );
};

export default Item; 