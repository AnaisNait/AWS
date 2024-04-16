import express from "express";
import { ajouterRendezvous } from "../controllers/rendezVous.js"; // Import du contrôleur de l'inscription
import checkAuth from '../middlewares/check-auth.js'; // Middleware pour vérifier l'authentification


const rendezVousRouter = express.Router(); // Création du routeur d'authentification

rendezVousRouter.use(checkAuth); // Utilisation du middleware pour vérifier l'authentification sur toutes les routes de ce routeur

// Route POST pour l'inscription des utilisateurs
rendezVousRouter.post('/ajouterRendezvous', ajouterRendezvous);

export default rendezVousRouter; // Export du routeur d'authentification
