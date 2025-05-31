import React from 'react';
import Slider from 'react-slick';
import Item from './Item';
import '../css/ProductCarousel.css';

const ProductCarousel = ({ products }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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

    return (
        <div className="carousel-container">
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