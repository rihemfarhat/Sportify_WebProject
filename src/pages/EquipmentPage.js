import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import "../style/EquipmentList.css";

const EquipmentList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [filteredEquipment, setFilteredEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/equipment")
            .then((response) => {
                setEquipment(response.data);
                setFilteredEquipment(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des équipements", error);
                setError("Échec du chargement des équipements.");
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") {
            setFilteredEquipment(equipment);
        } else {
            const filtered = equipment.filter(item =>
                item.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredEquipment(filtered);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEquipment.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);

    return (
        <div className="equipment-list-page">
            {/* Navbar */}
            <nav className="navbar2">
                    <Link to="/" className="logo-link2">
                        <img
                            src={require("../assets/images/logo.png")}
                            alt="logo"
                            className="logosignup2"
                        />
                    </Link>
            
                    <ul className="nav-links2">
                        <li><a href="#">Training</a></li>
                        <li><Link to="/Nutrition">Nutrition</Link></li>
                        <li><Link to="/news">Blog</Link></li>
                        <li><Link to="/ProductList">Shop</Link></li>
                    </ul>
            
                    <form className="search-form">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search for..."
                            className="search-input"
                        />
                        <button type="submit" className="search-icon-btn">
                            <FontAwesomeIcon icon={faSearch} size="lg" />
                        </button>
                    </form>
            
                    <div className="nav-icons2">
                        <Link to="/cart" className="nav-icon2">
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

            {/* Displaying Equipment */}
            <main className="equipment-main-content">
                <section className="featured-equipment">
                    <h2 className="section-title">All Equipment</h2>
                    <div className="equipment-grid">
                        {loading && <p>Loading equipment...</p>}
                        {error && <p>{error}</p>}
                        {!loading && currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <div key={item._id} className="equipment-card">
                                    <img src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.price}</p>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        View Equipment
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No equipment found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={currentPage === index + 1 ? "active" : ""}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>
                        
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EquipmentList;
