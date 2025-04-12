import React, { useEffect, useState } from 'react';
import '../style/CartPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingBag, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart, faLeaf, faBolt, faStar } from '@fortawesome/free-solid-svg-icons';

import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [recommendedProducts] = useState([
        {
            id: 1,
            title: "Nike Air Max 270",
            price: 299.99,
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png",
            sizes: [38, 39, 40, 41, 42]
        },
        {
            id: 2,
            title: "Adidas Ultraboost 21",
            price: 349.99,
            image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_21_Shoes_Black_GZ0127_01_standard.jpg",
            sizes: [39, 40, 41, 42, 43]
        }
    ]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleRemove = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const deliveryFee = 8.00;
    const total = subtotal + deliveryFee;

    return (
        <div className="creative-cart">
             <nav className="navbar2">
                            <Link to="/" className="logo-link2">
                                <img
                                    src={require("../assets/images/logo.png")}
                                    alt="logo"
                                    className="logosignup2"
                                />
                            </Link>
            
                            <ul className="nav-links2">
                                <li><Link to="/TrainingPage" >Training</Link></li>
                                <li><Link to="/Nutrition">Nutrition</Link></li>
                                <li><Link to="/news">Blog</Link></li>
                                <li><Link to="/ProductList">Shop</Link></li>
                            </ul>
            

            
                            <div className="nav-icons2">
                                <Link to="/CartPage" className="nav-icon2">
                                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                </Link>
                            </div>
            
                            <div className="nav-buttons-coach2">
                                <Link to="/login_coach" className="login-btn-coach2">Be a coach</Link>
                            </div>
            
                            <div className="nav-buttons2">
                                <Link to="/login" className="login-btn2">Start Now</Link>
                            </div>
                        </nav>
            <div className="cart-header">
                <FontAwesomeIcon icon={faShoppingBag} className="cart-icon" />
                <h1 className="cart-title">Mon Panier <span className="cart-count">{cart.length} article{cart.length !== 1 ? 's' : ''}</span></h1>
            </div>

            {cart.length === 0 ? (
                <div className="empty-cart-creative">
                    <FontAwesomeIcon icon={faShoppingBag} className="empty-cart-icon" />
                    <h2>Votre panier est vide</h2>
                    <p>Parcourez notre collection et trouvez des articles qui vous plaisent</p>
                    <button className="browse-btn">Découvrir nos produits</button>
                </div>
            ) : (
                <div className="cart-content-creative">
                    <div className="cart-items-section">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item-creative">
                                <div className="product-image-container">
                                    <img src={item.image} alt={item.title} className="product-image" />
                                    <button className="quick-view-btn">Aperçu rapide</button>
                                </div>
                                <div className="product-details">
                                    <h3 className="product-title">{item.title}</h3>
                                    <p className="product-size">Pointure: {item.selectedSize || 'Non spécifiée'}</p>
                                    <p className="product-price">{item.price.toFixed(2)} TND</p>
                                    <div className="product-actions">
                                        <button 
                                            onClick={() => handleRemove(index)} 
                                            className="remove-button"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                                            Supprimer
                                        </button>
                                        <button className="wishlist-button">
                                            <FontAwesomeIcon icon={faHeart} />
                                            Ajouter à la liste de souhaits
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Résumé de la commande</h3>
                        <div className="summary-table">
                            <div className="summary-row">
                                <span>Articles</span>
                                <span>{subtotal.toFixed(2)} TND</span>
                            </div>
                            <div className="summary-row">
                                <span>Livraison</span>
                                <span>{deliveryFee.toFixed(2)} TND</span>
                            </div>
                            <div className="summary-row discount-row">
                                <span>Code promo</span>
                                <span className="apply-discount">Appliquer</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total TTC</span>
                                <span>{total.toFixed(2)} TND</span>
                            </div>
                        </div>

                        <button className="checkout-button">PROCÉDER AU PAIEMENT</button>
                        <p className="secure-checkout">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#4CAF50"/>
                                <path d="M16 10H8V8H16V10Z" fill="white"/>
                                <path d="M16 14H8V12H16V14Z" fill="white"/>
                            </svg>
                            Paiement sécurisé
                        </p>
                    </div>

                    <div className="recommendations-section">
                        <div className="divider">
                            <span>VOUS POURRIEZ AUSSI AIMER</span>
                        </div>
                        <div className="recommended-products">
                            {recommendedProducts.map(product => (
                                <div key={product.id} className="recommended-product">
                                    <img src={product.image} alt={product.title} />
                                    <h4>{product.title}</h4>
                                    <p>{product.price.toFixed(2)} TND</p>
                                    <button className="add-to-cart-btn">Ajouter au panier</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <footer className="news-page-footer">
                            <div className="news-footer-container">
                                <div className="news-footer-section">
                                    <h4>About Us</h4>
                                    <p>Your journey to fitness starts here with our expert guidance and community support.</p>
                                </div>
                                
                                <div className="news-footer-section">
                                    <h4>Quick Links</h4>
                                    <ul className="news-footer-links">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/nutrition">Nutrition</Link></li>
                                        <li><Link to="/news">Blog</Link></li>
                                        <li><Link to="/ProductList">Shop</Link></li>
                                    </ul>
                                </div>
                                
                                <div className="news-footer-section">
                                    <h4>Connect With Us</h4>
                                    <div className="news-social-links">
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

export default CartPage;