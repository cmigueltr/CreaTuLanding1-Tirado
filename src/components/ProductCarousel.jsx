import React from 'react';
import Slider from 'react-slick';
import Item from './Item';
import '../css/ProductCarousel.css';

const ProductCarousel = ({ products }) => {
    // Si hay menos de 3 productos, ajustar la configuración
    const slidesToShow = Math.min(products.length, 3);
    const isSingleProduct = products.length === 1;
    
    const settings = {
        dots: !isSingleProduct, // No mostrar dots si hay un solo producto
        infinite: products.length > 1, // Solo infinito si hay más de 1 producto
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: products.length > 1, // Solo autoplay si hay más de 1 producto
        autoplaySpeed: 3000,
        arrows: !isSingleProduct, // No mostrar flechas si hay un solo producto
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(products.length, 2),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Si no hay productos, no mostrar el carrusel
    if (products.length === 0) {
        return <div className="no-products">No hay productos disponibles</div>;
    }

    return (
        <div className={`carousel-container ${isSingleProduct ? 'single-product' : ''}`}>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="carousel-item">
                        <Item {...product} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductCarousel; 