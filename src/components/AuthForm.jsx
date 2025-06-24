import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import '../css/AuthForm.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { auth } from '../service/firebase';
import { useForm } from 'react-hook-form';

const AuthForm = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { name: '', email: '', password: '', address: '' }
  });

  const handleAuth = async (data) => {
    setError('');
    setLoading(true);
    const db = getFirestore();
    try {
      if (isRegister) {
        // Registro
        const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await setDoc(doc(db, 'users', user.uid), {
          name: data.name,
          email: data.email,
          address: data.address,
          role: 'user',
          createdAt: new Date(),
        });
      } else {
        // Login
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }
      reset();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: err.message,
        confirmButtonColor: '#e6007e',
        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
        color: '#333',
        customClass: {
          popup: 'swal2-bizzco',
          confirmButton: 'swal2-bizzco-btn'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <form className="auth-form" onSubmit={handleSubmit(handleAuth)}>
        <h2>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
        {isRegister && (
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              {...register('name', { required: isRegister ? 'El nombre es obligatorio' : false })}
              autoComplete="name"
            />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'El email es obligatorio', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email no válido' } })}
            autoComplete="email"
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
          {errors.password && <span className="form-error">{errors.password.message}</span>}
        </div>
        {isRegister && (
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              {...register('address', { required: isRegister ? 'La dirección es obligatoria' : false })}
              autoComplete="street-address"
            />
            {errors.address && <span className="form-error">{errors.address.message}</span>}
          </div>
        )}
        {error && <div className="auth-error">{error}</div>}
        <button
          className="auth-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Procesando...' : isRegister ? 'Registrarme' : 'Ingresar'}
        </button>
        <div className="auth-toggle">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            className="auth-link"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </div>
        {onClose && (
          <button type="button" className="auth-close" onClick={onClose}>
            ×
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthForm; 