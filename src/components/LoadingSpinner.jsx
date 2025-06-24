import React from 'react';
import { PulseLoader } from 'react-spinners';
import '../css/LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <PulseLoader
                    color="#e6007e"
                    size={15}
                    margin={4}
                    aria-label="Loading Spinner"
                />
                <p>Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner; 