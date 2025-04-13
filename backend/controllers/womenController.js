const WomenProduct = require('../models/WomenProduct');

// GET all women products
const getAllWomenProducts = async (req, res) => {
    try {
        const products = await WomenProduct.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits femmes :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    getAllWomenProducts,
};
