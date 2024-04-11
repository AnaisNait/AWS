import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Contrôleur pour la connexion de l'utilisateur
export const login = async (requête, réponse) => {
    try {
        const { email, password } = requête.body;
        const user = await User.findOne({ email });

        // Vérifier si l'utilisateur existe
        if (!user) {
            return réponse.status(400).json({ message: "L'email ou le mot de passe est incorrect." });
        }

        // Vérifier si le mot de passe est correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return réponse.status(400).json({ message: "L'email ou le mot de passe est incorrect." });
        }

        // Si l'utilisateur et le mot de passe sont corrects, générer un token JWT qui expire dans 30 minutes
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{ expiresIn: '30m' });

        console.log(token)
        // Envoyer une réponse avec un message de bienvenue, les détails de l'utilisateur et le token JWT
        réponse.status(200).json({ message: `Bienvenue ${user.firstName}`, user, token });
    } catch (error) {
        // En cas d'erreur, envoyer une réponse avec un code de statut 500 et le message d'erreur
        réponse.status(500).json({ error: "Une erreur est survenue lors de la connexion." });
    }
}

// Contrôleur pour la déconnexion de l'utilisateur
export const logout = (requête, réponse) => {
    // Supprimer le token JWT du client en envoyant un cookie avec un token expiré ou aucun token
    réponse.cookie('token', '', { expires: new Date(0) }); // Expiration immédiate du cookie
    réponse.status(200).json({ message: "Déconnexion réussie" });
};

// Contrôleur pour afficher les détails de l'utilisateur
export const afficherUser = async (requête, réponse) => {
    try {
        // Extraire le token JWT de l'en-tête d'autorisation
        const token = requête.headers.authorization.split(' ')[1];
        
        // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        // Rechercher l'utilisateur connecté en utilisant l'identifiant extrait du token JWT
        const user = await User.findById(userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return réponse.status(404).json({ message: "L'utilisateur n'existe pas." });
        }

        // Retourner les données de l'utilisateur trouvé
        réponse.status(200).json({
            data: user
        });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        réponse.status(500).json({ error: "Une erreur est survenue lors de la récupération des informations de l'utilisateur." });
    }
}
