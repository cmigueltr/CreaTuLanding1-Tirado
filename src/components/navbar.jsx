import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import CartWidget from './CartWidget';
import logoImage from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

const Navbar = () => {
    const location = useLocation();
    const { user, userData, logout } = useAuth();
    const [showAuth, setShowAuth] = useState(false);
    const categories = [
        { id: 'nuevos', name: 'Nuevos' },
        { id: 'ofertas', name: 'Ofertas' },
        { id: 'masvendidos', name: 'Mas Vendidos' },
        { id: 'cakes', name: 'Tortas' },
        { id: 'cookies', name: 'Galletas' },
    ];

    const isProductsActive = location.pathname === '/products' || 
                           location.pathname.startsWith('/category/');
    const isHomeActive = location.pathname === '/';
    const navigate = useNavigate();

    return (
        <nav className="nav-container">
            <NavLink to="/" className="nav-brand">
                <div className="logo">
                    <img src={logoImage} alt="Bizzco Logo" className="logo-image" />
                </div>
            </NavLink>
            <ul className="nav-links">
                <li>
                    <div className={`nav-link-container ${isHomeActive ? 'active' : ''}`}>
                        <NavLink 
                            to="/" 
                            className="nav-link"
                        >
                            Home
                        </NavLink>
                    </div>
                </li>
                <li className="dropdown">
                    <div className={`nav-link-container ${isProductsActive ? 'active' : ''}`}>
                        <NavLink 
                            to="/products" 
                            className="nav-link"
                        >
                            <span>Products</span>
                            <span className="dropdown-arrow">▼</span>
                        </NavLink>
                    </div>
                    <div className="dropdown-content">
                        {categories.map(category => (
                            <NavLink 
                                key={category.id}
                                to={`/category/${category.id}`}
                                className={({ isActive }) => 
                                    isActive ? "dropdown-item active" : "dropdown-item"
                                }
                            >
                                {category.name}
                            </NavLink>
                        ))}
                    </div>
                </li>
            </ul>
            <div className="nav-actions">
                <NavLink to="/cart" className="cart-link">
                    <CartWidget/>
                </NavLink>
                {user && userData?.role === 'admin' && (
                    <NavLink to="/admin" className="admin-link" title="Panel de administración">
                        <span className="admin-icon" role="img" aria-label="Admin">⚙️</span>
                        <span className="admin-text">Admin</span>
                    </NavLink>
                )}
                {user ? (
                    <div className="user-info">
                        <span className="user-name">{userData?.name || user.email}</span>
                        <button className="logout-btn" onClick={logout} title="Cerrar sesión">
                            <span className="logout-icon" role="img" aria-label="Cerrar sesión">⎋</span>
                        </button>
                    </div>
                ) : (
                    <button className="login-btn user-icon-btn" onClick={() => navigate('/perfil')} title="Ingresar o ver perfil">
                        <span className="user-icon" role="img" aria-label="Usuario">👤</span>
                    </button>
                )}
            </div>
            {showAuth && <AuthForm onClose={() => setShowAuth(false)} />}
        </nav>
    );
};

export default Navbar;
