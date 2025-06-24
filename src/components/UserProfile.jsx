import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../service/firebase';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import '../css/Item.css';

const UserProfile = () => {
  const { user, userData } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        address: userData.address || '',
        phone: userData.phone || ''
      });
    }
  }, [userData]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoadingOrders(true);
      const q = query(collection(db, 'ordenes'), where('comprador.email', '==', user.email));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'users', user.uid), formData);
    setEditMode(false);
    window.location.reload();
  };

  return (
    <div className="item-detail" style={{ maxWidth: 600, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Mi Perfil</h2>
      <div style={{ marginBottom: 30 }}>
        <strong>Email:</strong> {user.email}
      </div>
      {!editMode ? (
        <div style={{ marginBottom: 30 }}>
          <div><strong>Nombre:</strong> {userData?.name || '-'}</div>
          <div><strong>Dirección:</strong> {userData?.address || '-'}</div>
          <div><strong>Teléfono:</strong> {userData?.phone || '-'}</div>
          <button className="edit-product-btn" onClick={() => setEditMode(true)}>Editar datos</button>
        </div>
      ) : (
        <form className="edit-product-form center-form" onSubmit={handleSave} style={{ marginBottom: 30 }}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
      )}
      <h3 style={{ marginTop: 30, marginBottom: 10 }}>Mis Órdenes</h3>
      {loadingOrders ? (
        <div>Cargando órdenes...</div>
      ) : orders.length === 0 ? (
        <div>No tienes órdenes registradas.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{ marginBottom: 18, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <div><strong>ID:</strong> {order.id}</div>
              <div><strong>Estado:</strong> {order.estado}</div>
              <div><strong>Fecha:</strong> {order.fecha?.toDate ? order.fecha.toDate().toLocaleString() : '-'}</div>
              <div><strong>Total:</strong> ${order.total || (order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</div>
              <div><strong>Productos:</strong>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {order.items?.map(item => (
                    <li key={item.id}>{item.name} x{item.quantity}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile; 