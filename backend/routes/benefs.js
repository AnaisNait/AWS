import express from "express";
import { afficherBenef, ajouterBenef, detailBenef, modifierBenef, supprimerBenef } from "../controllers/beneficiaire.js"; // Contrôleurs pour gérer les opérations sur les bénéficiaires
import checkAuth from '../middlewares/check-auth.js'; // Middleware pour vérifier l'authentification

const benefRouter = express.Router(); // Création du routeur pour les bénéficiaires

// Middleware pour vérifier l'authentification sur toutes les routes de ce routeur
benefRouter.use(checkAuth);

// Route pour afficher la liste des bénéficiaires
benefRouter.get('/afficherBenef', afficherBenef);

// Route pour ajouter un nouveau bénéficiaire
benefRouter.post('/ajouterBenef', ajouterBenef);

// Route pour afficher les détails d'un bénéficiaire spécifique
benefRouter.get('/detailBenef/:id', detailBenef);

// Route pour modifier les informations d'un bénéficiaire spécifique
benefRouter.put('/modifierBenef/:id', modifierBenef);

// Route pour supprimer un bénéficiaire spécifique
benefRouter.delete('/supprimerBenef/:id', supprimerBenef);

export default benefRouter; // Export du routeur des bénéficiaires
