import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import ProductCarousel from "./ProductCarousel";
import { LoadingContext } from "../context/LoadingContext";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

/**
 * Componente contenedor que maneja la lógica de obtención y visualización de productos
 * @param {string} greeting - Mensaje de bienvenida a mostrar
 * @returns {JSX.Element} Componente con la lista de productos
 */
const ItemListContainer = ({ greeting }) => {
    // Estado para almacenar los productos y el estado de carga
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();
    const { setIsLoading } = useContext(LoadingContext);
    const { userData } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: { name: '', price: '', description: '', stock: '', img: '', category: [] }
    });

    const getCategoryName = (id) => {
        const categories = {
            'cakes': 'Tortas',
            'cookies': 'Galletas',
            'nuevos': 'Nuevos',
            'ofertas': 'Ofertas',
            'masvendidos': 'Más Vendidos'
        };
        return categories[id] || 'Productos';
    };

    // Firebase - Obtener productos
    useEffect(() => {
        setIsLoading(true);
        console.log('Obteniendo productos...', categoryId ? `Categoría: ${categoryId}` : 'Todas las categorías');
        
        const productsCollection = collection(db, 'productos');
        
        getDocs(productsCollection)
            .then((res) => {
                console.log('Documentos obtenidos:', res.docs.length);
                let list = res.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    };
                });
                // Si hay una categoría seleccionada, filtrar productos que incluyan esa categoría
                if (categoryId) {
                    list = list.filter(product => {
                        if (Array.isArray(product.category)) {
                            return product.category.includes(categoryId);
                        } else {
                            return product.category === categoryId;
                        }
                    });
                }
                console.log('Productos procesados:', list);
                setProducts(list);
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);
                setProducts([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [categoryId, setIsLoading]); // Se ejecuta cuando cambia la categoría

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'category') {
            if (checked) {
                setFormData({ ...formData, category: [...formData.category, value] });
            } else {
                setFormData({ ...formData, category: formData.category.filter(cat => cat !== value) });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const categories = [
        { id: 'nuevos', name: 'Nuevos' },
        { id: 'ofertas', name: 'Ofertas' },
        { id: 'masvendidos', name: 'Más Vendidos' },
        { id: 'cakes', name: 'Tortas' },
        { id: 'cookies', name: 'Galletas' },
    ];

    const handleAddProduct = async (data) => {
        try {
            await addDoc(collection(db, 'productos'), {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                category: data.category
            });
            setShowForm(false);
            reset();
            window.location.reload();
        } catch (error) {
            alert('Error al agregar producto');
        }
    };

    // Renderizar la lista de productos
    return (
        <div className="greeting-container">
            <h1>{greeting}</h1>
            {userData?.role === 'admin' && (
                <>
                    <button className="add-product-btn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : 'Agregar producto'}
                    </button>
                    {showForm && (
                        <form className="add-product-form center-form" onSubmit={handleSubmit(handleAddProduct)} style={{ margin: '20px auto' }}>
                            <input {...register('name', { required: 'El nombre es obligatorio' })} placeholder="Nombre" />
                            {errors.name && <span className="form-error">{errors.name.message}</span>}
                            <input {...register('price', { required: 'El precio es obligatorio', min: { value: 0.01, message: 'Debe ser mayor a 0' } })} placeholder="Precio" type="number" step="0.01" />
                            {errors.price && <span className="form-error">{errors.price.message}</span>}
                            <input {...register('description', { required: 'La descripción es obligatoria' })} placeholder="Descripción" />
                            {errors.description && <span className="form-error">{errors.description.message}</span>}
                            <input {...register('stock', { required: 'El stock es obligatorio', min: { value: 1, message: 'Debe ser al menos 1' } })} placeholder="Stock" type="number" />
                            {errors.stock && <span className="form-error">{errors.stock.message}</span>}
                            <input {...register('img', { required: 'La URL de imagen es obligatoria', pattern: { value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i, message: 'URL de imagen no válida' } })} placeholder="URL de imagen" />
                            {errors.img && <span className="form-error">{errors.img.message}</span>}
                            <div className="category-checkboxes" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '10px 0' }}>
                                {categories.map(cat => (
                                    <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.98rem' }}>
                                        <input
                                            type="checkbox"
                                            value={cat.id}
                                            {...register('category', { validate: value => (watch('category')?.length > 0) || 'Selecciona al menos una categoría' })}
                                            style={{ accentColor: '#e6007e' }}
                                        />
                                        {cat.name}
                                    </label>
                                ))}
                            </div>
                            {errors.category && <span className="form-error">{errors.category.message}</span>}
                            <button type="submit">Guardar</button>
                        </form>
                    )}
                </>
            )}
            {!categoryId ? (
                <>
                    <h2>Nuestros Productos</h2>
                    <ProductCarousel products={products} />
                </>
            ) : (
                <>
                    <h2>{getCategoryName(categoryId)}</h2>
                    {products.length > 0 ? (
                        <ProductCarousel products={products} />
                    ) : (
                        <div className="no-products">No hay productos disponibles en esta categoría</div>
                    )}
                </>
            )}
        </div>
    );
};

export default ItemListContainer;