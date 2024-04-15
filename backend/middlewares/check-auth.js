import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            console.error('Aucun jeton fourni, autorisation refusée');
            return response.status(401).json({ error: 'Aucun jeton fourni, autorisation refusée' });
        }

        // Extraire le token du header
        const tokenParts = token.split(' ');
        const tokenBearer = tokenParts[0];
        const tokenValue = tokenParts[1];

        if (tokenBearer !== 'Bearer' || !tokenValue) {
            console.error('Format de jeton invalide');
            return response.status(401).json({ error: 'Format de jeton invalide' });
        }

        // Vérifier le token JWT
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log('Jeton déchiffré:', decodedToken);

        // Vérifier si l'utilisateur associé au token existe
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            console.error('Utilisateur non trouvé');
            return response.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        // Si tout est bon, attacher l'utilisateur à l'objet request et passer au middleware suivant
        request.user = user;
        next();
    } catch (error) {
        console.error('Erreur dans le middleware checkAuth:', error);
        return response.status(401).json({ error: 'Jeton invalide/expiré' });
    }
}

export default checkAuth;