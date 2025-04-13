const menProduct = require('../models/menProduct');

const getAllmenProducts = async (req, res) => {
    try {
        const products = await menProduct.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits hommes :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    getAllmenProducts,
};
