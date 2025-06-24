//importamos react y useContext para poder usar el contexto
import React, { useContext, useState, useEffect } from 'react';
import '../css/Item.css';
import ItemCount from './ItemCount';
//importamos el contexto para poder usarlo
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../service/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';

const ItemDetail = ({ detalle }) => {
    const [compra, setCompra] = useState(false);
    const { addItem } = useContext(CartContext);
    const { userData } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ ...detalle });
    const categories = [
        { id: 'nuevos', name: 'Nuevos' },
        { id: 'ofertas', name: 'Ofertas' },
        { id: 'masvendidos', name: 'Más Vendidos' },
        { id: 'cakes', name: 'Tortas' },
        { id: 'cookies', name: 'Galletas' },
    ];
    //desestructuramos el contexto
    //const { cart, setCart } = useContext(CartContext);
    //funcion para agregar un item al carrito
    const handleAddToCart = (cantidad) => {
        setCompra(true);
        console.log(`Agregando ${cantidad} unidades de ${detalle.name} al carrito`);
        addItem(detalle, cantidad);
    };

    const handleDelete = async () => {
        if(window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            await deleteDoc(doc(db, 'productos', detalle.id));
            window.location.href = '/';
        }
    };

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: { name: detalle.name, price: detalle.price, description: detalle.description, stock: detalle.stock, img: detalle.img, category: Array.isArray(detalle.category) ? detalle.category : (detalle.category ? [detalle.category] : []) }
    });

    useEffect(() => {
        setValue('name', detalle.name);
        setValue('price', detalle.price);
        setValue('description', detalle.description);
        setValue('stock', detalle.stock);
        setValue('img', detalle.img);
        setValue('category', Array.isArray(detalle.category) ? detalle.category : (detalle.category ? [detalle.category] : []));
    }, [detalle, setValue]);

    const handleEditSubmit = async (data) => {
        await updateDoc(doc(db, 'productos', detalle.id), {
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            category: data.category
        });
        setEditMode(false);
        window.location.reload();
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
                    {compra ? 
                    <div className="post-purchase-links">
                        <Link to="/cart" className="go-to-cart">
                            🛒 Ir al carrito
                        </Link>
                        <Link to="/" className="continue-shopping">
                            🏠 Seguir comprando
                        </Link>
                    </div> :
                    <div className="item-detail-buttons">
                        <ItemCount 
                            stock={detalle.stock} 
                            initial={1}
                            onAdd={handleAddToCart}
                        />
                    </div>
                    }
                </div>
                {userData?.role === 'admin' && (
                    <div className="admin-product-actions">
                        {!editMode ? (
                            <>
                                <button className="edit-product-btn" onClick={() => setEditMode(true)}>Editar</button>
                                <button className="delete-product-btn" onClick={handleDelete}>Eliminar</button>
                            </>
                        ) : (
                            <form className="edit-product-form" onSubmit={handleSubmit(handleEditSubmit)} style={{ margin: '20px 0' }}>
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
                                <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: 8 }}>Cancelar</button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;
