import React from 'react';
import '../css/Navbar.css';
import CartWidget from './CartWidget';

const Navbar = () => {
    return (
        <div className="nav-container">
            <h2>Bizzco Cakes and Cookies</h2>
            <ul>
                <li> <a href="/">Home</a></li>
                <li> <a href="/about">About</a></li>
                <li> <a href="/contact">Contact</a></li>
                <li> <a href="/services">Services</a></li>
                <li> <a href="/products">Products</a></li>       
            </ul>
            <CartWidget/>
        </div>
    )
}

export default Navbar;
