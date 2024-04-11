import express from "express";
import { register } from "../controllers/auth.js"; // Import du contrôleur de l'inscription

const authRouter = express.Router(); // Création du routeur d'authentification

// Route POST pour l'inscription des utilisateurs
authRouter.post('/register', register);

export default authRouter; // Export du routeur d'authentification
