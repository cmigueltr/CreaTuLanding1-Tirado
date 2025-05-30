import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../css/Navbar.css';
import CartWidget from './CartWidget';

const Navbar = () => {
    const location = useLocation();
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

    return (
        <nav className="nav-container">
            <h2 className="text-decoration-none">Bizzco Cakes and Cookies</h2>
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
            <CartWidget/>
        </nav>
    );
};

export default Navbar;
