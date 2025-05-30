import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../mock/AsyncService";
import ItemList from "./ItemList";

/**
 * Componente contenedor que maneja la lógica de obtención y visualización de productos
 * @param {string} greeting - Mensaje de bienvenida a mostrar
 * @returns {JSX.Element} Componente con la lista de productos
 */
const ItemListContainer = ({ greeting }) => {
    // Estado para almacenar los productos y el estado de carga
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    // Efecto para cargar los productos al montar el componente
    useEffect(() => {
        getProducts()
            .then((response) => {
                if (categoryId) {
                    // Filtrar productos por categoría
                    const filteredProducts = response.filter(
                        product => product.category === categoryId
                    );
                    setProducts(filteredProducts);
                } else {
                    setProducts(response);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);
                setLoading(false);
            });
    }, [categoryId]); // Se ejecuta cuando cambia la categoría

    // Mostrar mensaje de carga mientras se obtienen los productos
    if (loading) {
        return (
            <div className="greeting-container">
                <h1>{greeting}</h1>
                <div className="loading-container">Cargando productos...</div>
            </div>
        );
    }

    // Renderizar la lista de productos
    return (
        <div className="greeting-container">
            <h1>{greeting}</h1>
            {products.length > 0 ? (
                <ItemList products={products} />
            ) : (
                <div className="no-products">No hay productos disponibles en esta categoría</div>
            )}
        </div>
    );
};

export default ItemListContainer;