import express from "express";
import { afficherBenefListe, afficherVirement, ajouterVirement } from "../controllers/virement.js"; // Import des contrôleurs pour les opérations de virement
import checkAuth from "../middlewares/check-auth.js"; // Middleware pour vérifier l'authentification

const virementRouter = express.Router(); // Création du routeur pour les virements

virementRouter.use(checkAuth); // Utilisation du middleware pour vérifier l'authentification sur toutes les routes de ce routeur

// Route pour ajouter un virement
virementRouter.post('/ajouterVirement', ajouterVirement);

// Route pour afficher la liste des bénéficiaires
virementRouter.get('/afficherBenefListe', afficherBenefListe);

// Route pour afficher les virements de l'utilisateur
virementRouter.get('/afficherVirement', afficherVirement);

export default virementRouter; // Export du routeur de virement
