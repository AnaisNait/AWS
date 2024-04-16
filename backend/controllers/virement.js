import jwt from "jsonwebtoken";
import Benef from "../models/benef.js";
import Solde from "../models/solde.js";
import User from "../models/user.js";
import Virement from "../models/virement.js";

// Afficher la liste des bénéficiaires associés à l'utilisateur connecté
export const afficherBenefListe = async (request, response) => {
    try {
        // Extraire le token JWT de l'en-tête d'autorisation
        const token = request.headers.authorization.split(' ')[1];
        // Décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Rechercher les bénéficiaires associés à l'utilisateur identifié qui n'ont pas été supprimés
        const benefs = await Benef.find({ utilisateur: userId, deleted: { $ne: true } }).populate('utilisateur');

        // Formater les données des bénéficiaires pour le menu déroulant
        const benefDropdown = benefs.map(benef => ({
            _id: benef._id,
            nom: benef.nom,
            iban: benef.iban
        }));

        // Retourner la liste des bénéficiaires formatée
        response.status(200).json({
            count: benefDropdown.length,
            data: benefDropdown
        });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        response.status(500).json({ error: "Une erreur est survenue lors de la récupération de la liste des bénéficiaires." });
    }
};

// Ajouter un virement
export const ajouterVirement = async function (request, response) {
    try {
        const { montant, motif, beneficiaireId } = request.body;
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Rechercher l'utilisateur effectuant le virement
        const utilisateur = await User.findById(userId);
        if (!utilisateur) {
            return response.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Rechercher le bénéficiaire du virement
        const beneficiaire = await Benef.findById(beneficiaireId);
        if (!beneficiaire) {
            return response.status(404).json({ message: 'Bénéficiaire non trouvé' });
        }

        // Rechercher le solde de l'utilisateur effectuant le virement
        const solde = await Solde.findOne({ utilisateur: userId });
        if (!solde) {
            return response.status(404).json({ message: 'Solde non trouvé' });
        }

        // Vérifier si le solde de l'utilisateur est suffisant pour le virement
        if (solde.montant < montant) {
            return response.status(400).json({ message: 'Solde insuffisant pour effectuer ce virement' });
        }

        // Calculer le nouveau solde après le virement
        const nouveauSolde = solde.montant - montant;

        // Mettre à jour le solde de l'utilisateur
        await Solde.findOneAndUpdate({ utilisateur: userId }, { montant: nouveauSolde });

        // Créer un nouveau virement
        const nouveauVirement = new Virement({
            montant,
            motif,
            utilisateur: userId,
            beneficiaire: beneficiaire._id,
            soldeUtilisateur: solde._id // Ajouter l'ID du solde associé à l'utilisateur
        });
        await nouveauVirement.save();
        
        // Envoyer une response avec un message de succès
        response.status(201).json({ message: "Virement créé avec succès" });

    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        response.status(500).json({ message: "Une erreur est survenue lors de la création du virement." });
    }
};

// Afficher les virements effectués par l'utilisateur connecté
export const afficherVirement = async (request, response) => {
    try {
        // Extraire le token JWT de l'en-tête d'autorisation
        const token = request.headers.authorization.split(' ')[1];
        // Décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Rechercher les virements associés à l'utilisateur identifié
        const virements = await Virement.find({ utilisateur: userId }).populate('utilisateur');

        // Retourner les virements trouvés
        response.status(200).json({
            count: virements.length,
            data: virements
        });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        response.status(500).json({ error: "Une erreur est survenue lors de la récupération des virements." });
    }
}
