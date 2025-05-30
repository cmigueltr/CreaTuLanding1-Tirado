import React from 'react';
import Item from './Item';
import '../css/Item.css';

const ItemList = ({ products }) => {
    return (
        <div className="item-list-container">
            {products.map((product) => (
                <Item
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.img || "https://via.placeholder.com/300x200?text=Producto"}
                    stock={product.stock}
                />
            ))}
        </div>
    );
};

export default ItemList;