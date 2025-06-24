import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, userData, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) return null;

  if (!user) {
    return showAuth ? (
      <AuthForm onClose={() => setShowAuth(false)} />
    ) : (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h2>Debes iniciar sesión para finalizar la compra</h2>
        <button className="auth-btn" onClick={() => setShowAuth(true)}>
          Ingresar / Registrarse
        </button>
      </div>
    );
  }

  if (adminOnly && userData?.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h2>Acceso solo para administradores</h2>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 