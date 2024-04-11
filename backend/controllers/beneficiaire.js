import IBAN from 'iban'; // Bibliothèque pour la validation des IBAN
import jwt from "jsonwebtoken"; // Bibliothèque pour la gestion des tokens JWT
import Benef from "../models/benef.js"; // Import du modèle de bénéficiaire

// Fonction pour afficher tous les bénéficiaires associés à un utilisateur
export const afficherBenef = async (requête, réponse) => {
    try {
        // Extraire le token JWT de l'en-tête d'autorisation
        const token = requête.headers.authorization.split(' ')[1];
        
        // Décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Recherche des bénéficiaires associés à l'utilisateur identifié
        const benefs = await Benef.find({ utilisateur: userId }).populate('utilisateur');

        // Retourner les bénéficiaires trouvés
        réponse.status(200).json({
            count: benefs.length,
            data: benefs
        });
    } catch (erreur) {
        // En cas d'erreur, renvoyer un message d'erreur
        réponse.status(500).json({ erreur: erreur.message });
    }
}

// Fonction pour afficher les détails d'un bénéficiaire spécifique
export const detailBenef = async (requête, réponse) => {
    try {
        const { id } = requête.params;
        const benef = await Benef.findById(id);

        if (!benef) {
            return réponse.status(404).json({ erreur: "Bénéficiaire introuvable" });
        }

        return réponse.status(200).json(benef);
    } catch (erreur) {
        réponse.status(500).json({ erreur: erreur.message });
    }
}

// Fonction pour ajouter un nouveau bénéficiaire
export const ajouterBenef = async (requête, réponse) => {
    try {
        const { nom, iban } = requête.body;
        
        // Vérifier si l'IBAN est valide
        if (!IBAN.isValid(iban)) {
            return réponse.status(400).json({ erreur: "IBAN invalide" });
        }

        // Extraire le token JWT de l'en-tête Authorization
        const token = requête.headers.authorization.split(' ')[1];
        
        // Décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        // Ajouter le bénéficiaire avec les informations fournies
        const newBenef = new Benef({
            nom,
            iban,
            utilisateur: userId // Assigner l'identifiant de l'utilisateur au bénéficiaire
        });
        await newBenef.save();
        
        réponse.status(201).json({ message: "Bénéficiaire créé avec succès" });
    } catch (erreur) {
        réponse.status(500).json({ erreur: erreur.message });
    }
};

// Fonction pour modifier les informations d'un bénéficiaire existant
export const modifierBenef = async (requête, réponse) => {
    try {
        const { id } = requête.params;

        const benefToUpdate = await Benef.findById(id);

        if (!benefToUpdate) {
            return réponse.status(404).json({ message: 'Bénéficiaire non trouvé' });
        }

        // Vérifier si l'IBAN est fourni dans la requête
        if (requête.body.hasOwnProperty('iban')) {
            const iban = requête.body.iban;

            // Vérifier si l'IBAN est valide
            if (!IBAN.isValid(iban)) {
                return réponse.status(400).json({ message: 'IBAN invalide' });
            }
        }

        // Mettre à jour les attributs fournis dans la requête
        for (const clé in requête.body) {
            if (requête.body.hasOwnProperty(clé)) {
                benefToUpdate[clé] = requête.body[clé];
            }
        }

        // Sauvegarder les modifications
        const updatedBenef = await benefToUpdate.save();

        réponse.status(200).json({ message: 'Bénéficiaire mis à jour avec succès', updatedBenef });
    } catch (erreur) {
        console.error(erreur.message);
        réponse.status(500).json({ message: erreur.message });
    }
};

// Fonction pour marquer un bénéficiaire comme supprimé
export const supprimerBenef = async (requête, réponse) => {
    try {
        const { id } = requête.params;

        // Chercher le bénéficiaire à supprimer dans la base de données et le supprimer
        const benefToDelete = await Benef.findByIdAndDelete(id);

        if (!benefToDelete) {
            return réponse.status(404).json({ message: "Bénéficiaire non trouvé" });
        }

        réponse.status(200).json({ message: "Bénéficiaire marqué comme supprimé" });
    } catch (erreur) {
        réponse.status(500).json({ erreur: erreur.message });
    }
};
