import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    const { id } = useParams();  // Récupérer l'ID du produit à partir de l'URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)  // Appel API pour récupérer les détails du produit
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Erreur lors du chargement des détails du produit.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Chargement des détails...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <img src={product.image} alt={product.title} className="product-detail-image" />
                <div className="product-detail-info">
                    <h1>{product.title}</h1>
                    <p><strong>Price:</strong> {product.price}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <button className="add-to-cart-btn">
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
