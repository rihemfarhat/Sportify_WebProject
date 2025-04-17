const jwt = require('jsonwebtoken');

const authMiddleware = () => {
  return (req, res, next) => {
    // Vérification si le header Authorization est bien présent et si son format est "Bearer <token>"
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: 'Token manquant ou format incorrect, accès interdit' });
    }

    // Extraction du token après "Bearer "
    const token = authHeader.split(" ")[1];

    try {
      // Vérification et décodage du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Ajouter l'id du coach dans req.user pour l'accès aux données suivantes
      next(); // Passer à la prochaine étape
    } catch (error) {
      // Si le token est invalide ou expiré
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  };
};


module.exports = authMiddleware;
