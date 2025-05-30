import React, { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div className="item-count">
            <div className="count-controls">
                <button 
                    onClick={decrement}
                    disabled={count <= 0}
                    aria-label="Decrementar cantidad"
                >
                    -
                </button>
                <span className="count-display">{count}</span>
                <button 
                    onClick={increment}
                    disabled={count >= stock}
                    aria-label="Incrementar cantidad"
                >
                    +
                </button>
            </div>
            <button 
                className="btn add-to-cart"
                onClick={() => onAdd(count)}
                disabled={count === 0}
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;