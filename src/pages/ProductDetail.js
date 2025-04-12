import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faLeaf, faBolt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import '../style/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur lors du chargement des détails du produit.");
                setLoading(false);
            });
    }, [id]);

    
    const shouldShowSizes = () => {
        if (!product) return false;
        const lowerTitle = product.title.toLowerCase();
        return lowerTitle.includes('chaussures') || lowerTitle.includes('chaussettes');
    };

    const handleAddToCart = () => {
        if (shouldShowSizes() && !selectedSize) {
            alert("Veuillez sélectionner une taille avant d'ajouter au panier.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = cart.findIndex(
            (item) => item.id === product._id && item.selectedSize === selectedSize
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: product._id,
                title: product.title,
                price: parseFloat(product.price),
                image: product.image,
                quantity,
                selectedSize: shouldShowSizes() ? selectedSize : null
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Produit ajouté au panier !");
    };

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-detail-page">
      <nav className="navbar">
         <Link to="/" className="logo-link">
           <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup2" />
         </Link>
     
         <div className="nav-center">
           <ul className="nav-links">
             <li><Link to="/TrainingPage">Training</Link></li>
             <li><Link to="/Nutrition">Nutrition</Link></li>
             <li><Link to="/news">Blog</Link></li>
             <li><Link to="/ProductList">Shop</Link></li>
           </ul>
         </div>
     
         <div className="nav-right">
           <div className="nav-coach-cart">
             <Link to="/CartPage" className="nav-icon">
               <FontAwesomeIcon icon={faShoppingCart} size="lg" />
             </Link>
             <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
           </div>
     
           <div className="nav-buttons">
             <Link to="/login" className="login-btn">Start Now</Link>
           </div>
         </div>
       </nav>
            <div className="product-badges">
                <span className="badge new">NOUVEAU</span>
                {Math.random() > 0.5 && <span className="badge eco"><FontAwesomeIcon icon={faLeaf} /> ECO</span>}
                <span className="badge fast"><FontAwesomeIcon icon={faBolt} /> LIVRAISON EXPRESS</span>
            </div>

            <div className="product-detail-container">
                <div className="product-image-container">
                    <img src={product.image} alt={product.title} className="product-detail-image" />
                </div>

                <div className="product-detail-info">
                    <h1>{product.title}</h1>

                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                                icon={faStar}
                                key={i}
                                className={i < 4 ? 'star filled' : 'star'}
                            />
                        ))}
                        <span>(128 avis)</span>
                    </div>

                    <div className="price-container">
                        <span className="price">{product.price} TND</span>
                        {product.oldPrice && <span className="old-price">{product.oldPrice} TND</span>}
                        {product.oldPrice && (
                            <span className="discount">
                                -{Math.round((1 - parseFloat(product.price) / parseFloat(product.oldPrice)) * 100)}%
                            </span>
                        )}
                    </div>

                    <p className="delivery-info">
                        <span className="delivery-icon">🚚</span>
                        Livraison entre le 14/04/2025 et le 15/04/2025
                    </p>

                    {shouldShowSizes() && (
                        <div className="size-section">
                            <h3>Pointure :</h3>
                            <div className="size-options">
                                {['37', '38', '39', '40', '41'].map((size) => (
                                    <div
                                        key={size}
                                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                        {size === '38' && <span className="size-popular">Populaire</span>}
                                    </div>
                                ))}
                            </div>
                            <a href="#size-guide" className="size-guide-link">Guide des tailles →</a>
                        </div>
                    )}

                    <div className="quantity-section">
                        <h3>Quantité :</h3>
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span className="quantity-value">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    <div className="options-section">
                        <div className="option-item">
                            <input type="checkbox" id="size-guide" />
                            <label htmlFor="size-guide">Guide de Taille</label>
                        </div>
                        <div className="option-item">
                            <input type="checkbox" id="delivery" checked readOnly />
                            <label htmlFor="delivery">Livraison Standard Offerte</label>
                        </div>
                        <div className="option-item">
                            <input type="checkbox" id="question" checked readOnly />
                            <label htmlFor="question">Service Client 24/7</label>
                        </div>
                    </div>

                    <div className="stock-info">
                        <div className="stock-indicator"></div>
                        <span>En stock - Prêt à expédier</span>
                    </div>

                    <button className="add-to-cart-btn pulse-animation" onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faShoppingCart} /> AJOUTER AU PANIER
                    </button>

                    <div className="product-highlights">
                        <h3>Pourquoi vous allez l'adorer :</h3>
                        <ul>
                            <li>✔ Produits haute qualité</li>
                            <li>✔ Confort exceptionnel</li>
                            <li>✔ Design moderne</li>
                            <li>✔ Garantie</li>
                        </ul>
                    </div>
                </div>
            </div>
   <footer className="page-footer">
           <div className="footer-container">
             <div className="footer-section">
               <h4>About Us</h4>
               <p>Your journey to fitness starts here with our expert guidance and community support.</p>
             </div>
             
             <div className="footer-section">
            <h4>Quick Links</h4>
             <ul className="footer-links">
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/nutrition">Nutrition</Link></li>
                <li><Link to="/news">Blog</Link></li>
                <li><Link to="/ProductList">Shop</Link></li>
             </ul>
            </div>
             
             <div className="footer-section">
               <h4>Connect With Us</h4>
               <div className="social-links">
                 <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                 <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                 <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                 <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
               </div>
             </div>
           </div>
           
           <div className="news-footer-bottom">
             <p>&copy; 2025 SPORTIFY all in One. All rights reserved.</p>
           </div>
         </footer>
        </div>
    );
};

export default ProductDetail;