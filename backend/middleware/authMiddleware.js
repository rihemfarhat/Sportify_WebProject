const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];  // Extraction du token du header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Vérification du token
    req.user = decoded;  // Ajouter les informations décodées à la requête
    next();  // Passer à la route suivante
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
