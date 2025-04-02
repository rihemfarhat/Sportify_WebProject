const Equipment = require('../models/equipment');

// Get all equipment
exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ message: "Error fetching equipment", error: err });
    }
};

// Add a new equipment
exports.addEquipment = async (req, res) => {
    const { title, price, link, image, page_url } = req.body;
    try {
        const newEquipment = new Equipment({
            title,
            price,
            link,
            image,
            page_url
        });
        await newEquipment.save();
        res.status(201).json({ message: 'Equipment added successfully', equipment: newEquipment });
    } catch (err) {
        res.status(500).json({ message: "Error adding equipment", error: err });
    }
};
