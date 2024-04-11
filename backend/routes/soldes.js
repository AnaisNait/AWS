import express from "express";
import { afficherSolde, ajouterSolde } from "../controllers/solde.js"; // Import des contrôleurs pour les opérations sur le solde
import checkAuth from "../middlewares/check-auth.js"; // Middleware pour vérifier l'authentification

const soldeRouter = express.Router(); // Création du routeur pour le solde

soldeRouter.use(checkAuth); // Utilisation du middleware pour vérifier l'authentification sur toutes les routes de ce routeur

// Route pour afficher le solde de l'utilisateur
soldeRouter.get('/afficherSolde', afficherSolde);

// Route pour ajouter du solde à celui de l'utilisateur
soldeRouter.put('/ajouterSolde', ajouterSolde);

export default soldeRouter; // Export du routeur de solde
