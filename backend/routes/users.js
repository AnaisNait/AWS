import express from "express";
import { afficherUser, login, logout } from "../controllers/user.js"; // Import des contrôleurs pour les opérations utilisateur
import checkAuth from '../middlewares/check-auth.js'; // Middleware pour vérifier l'authentification

const userRouter = express.Router(); // Création du routeur pour les utilisateurs

// Route pour la connexion des utilisateurs
userRouter.post('/login', login, checkAuth);

// Route pour afficher les détails de l'utilisateur
userRouter.get('/afficherUser', afficherUser, checkAuth);

// Route pour la déconnexion des utilisateurs
userRouter.post('/logout', logout);

export default userRouter; // Export du routeur utilisateur
