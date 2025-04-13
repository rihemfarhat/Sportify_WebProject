import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/CartPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingBag, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => setAllProducts(response.data))
            .catch(err => console.error("Error loading products", err));
    }, []);

    useEffect(() => {
        if (allProducts.length && cart.length) {
            const recommendations = allProducts.filter(product =>
                cart.some(cartItem =>
                    product.title.toLowerCase().includes(cartItem.title.split(' ')[0].toLowerCase()) &&
                    product.title !== cartItem.title
                )
            );
            setRecommendedProducts(recommendations);
        }
    }, [allProducts, cart]);

    const handleAddRecommendedToCart = (product) => {
        navigate(`/product/${product._id}`); // Redirect to product detail page
    };

    const handleRemove = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const subtotal = cart.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(',', '.')) 
            : item.price;
        return sum + (price * (item.quantity || 1));
    }, 0);
    
    const deliveryFee = 8.00;
    const total = subtotal + deliveryFee;

    return (
        <div className="creative-cart">
            {/* Same Navbar */}
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

            <div className="cart-header">
                <FontAwesomeIcon icon={faShoppingBag} className="cart-icon" />
                <h1 className="cart-title">My Cart <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span></h1>
            </div>

            {cart.length === 0 ? (
                <div className="empty-cart-creative">
                    <FontAwesomeIcon icon={faShoppingBag} className="empty-cart-icon" />
                    <h2>Your cart is empty</h2>
                    <p>Browse our collection and find items you like</p>
                    <button className="browse-btn">Discover Our Products</button>
                </div>
            ) : (
                <div className="cart-content-creative">
                    <div className="cart-items-section">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item-creative">
                                <div className="product-image-container">
                                    <img src={item.image} alt={item.title} className="product-image" />
                                </div>
                                <div className="product-details">
                                    <h3 className="product-title">{item.title}</h3>
                                    <p className="product-size">Size: {item.selectedSize || 'Not specified'}</p>
                                    <p className="product-price">
                                    {typeof item.price === 'string' 
                                        ? parseFloat(item.price.replace(',', '.')).toFixed(2) 
                                        : item.price.toFixed(2)
                                    } TND
                                    </p>
                                    <div className="product-actions">
                                        <button onClick={() => handleRemove(index)} className="remove-button">
                                            <FontAwesomeIcon icon={faTrash} className="trash-icon" /> Remove
                                        </button>
                                        <button className="wishlist-button">
                                            <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-table">
                            <div className="summary-row">
                                <span>Items</span>
                                <span>{subtotal.toFixed(2)} TND</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span>{deliveryFee.toFixed(2)} TND</span>
                            </div>
                            <div className="summary-row discount-row">
                                <span>Promo Code</span>
                                <span className="apply-discount">Apply</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total incl. tax</span>
                                <span>{total.toFixed(2)} TND</span>
                            </div>
                        </div>
                        <button 
    className="checkout-button"
    onClick={() => navigate('/PaymentPage', { 
        state: { 
            total: total,
            cartItems: cart // Optionnel : passer aussi les articles si besoin
        } 
    })}
>
    PROCEED TO CHECKOUT
</button>
                        <p className="secure-checkout">
                            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#4CAF50"/><path d="M16 10H8V8H16V10Z" fill="white"/><path d="M16 14H8V12H16V14Z" fill="white"/></svg>
                            Secure Payment
                        </p>
                    </div>

                    {recommendedProducts.length > 0 && (
                        <div className="recommendations-section">
                            <div className="divider">
                                <span>YOU MAY ALSO LIKE</span>
                            </div>
                            <div className="recommended-products">
                                {recommendedProducts.map(product => (
                                    <div key={product._id} className="recommended-product">
                                        <img src={product.image} alt={product.title} />
                                        <h4>{product.title}</h4>
                                        <p>
                                            {typeof product.price === 'string' 
                                                ? parseFloat(product.price.replace(',', '.')).toFixed(2) 
                                                : product.price.toFixed(2)
                                            } TND
                                        </p>
                                        <button 
                                            className="add-to-cart-btn"
                                            onClick={() => handleAddRecommendedToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
