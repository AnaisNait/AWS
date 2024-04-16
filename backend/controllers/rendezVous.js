
import jwt from "jsonwebtoken"; // Bibliothèque pour la gestion des tokens JWT
import nodemailer from 'nodemailer'; // Pour l'envoi d'e-mails
import RendezVous from "../models/rendezVous.js";
import User from "../models/user.js";

// Fonction pour envoyer un e-mail de confirmation
function sendEmail({ email, firstName, lastName, date, heure}) {
    return new Promise((resolve, reject) => {
        // Création d'un transporteur de messagerie avec les informations d'authentification
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email, // Adresse e-mail de l'expéditeur
                pass: process.env.password, // Mot de passe de l'expéditeur
            },
        });
        // Construire le contenu de l'e-mail de confirmation avec les détails du rendez-vous
        const mailContent = `
            <p>Bonjour ${firstName} ${lastName},</p>
            <p>Votre rendez-vous à E-Bank a été fixé pour le ${date} à ${heure}.</p>
            <p>Merci de votre confiance.</p>
        `;
        // Configuration de l'e-mail à envoyer

        const mail_configs = {
            from: `E-bank <${process.env.email}>`, // Adresse e-mail de l'expéditeur
            to: email, // Adresse e-mail du destinataire
            subject: "Confirmation de rendez-vous chez E-Bank", // Sujet de l'e-mail
            html: mailContent, // Corps de l'e-mail en HTML
        };
        // Envoi de l'e-mail
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: "Une erreur s'est produite" }); // En cas d'erreur, rejeter la promesse avec un message d'erreur
            }
            return resolve({ message: "E-mail envoyé avec succès" }); // En cas de succès, résoudre la promesse avec un message de succès
        });
    });
}


export const ajouterRendezvous = async (request, response) => {
    try {
        const { date, heure } = request.body;
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Récupérer les détails de l'utilisateur à partir de la base de données en utilisant l'ID de l'utilisateur
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Extraire les informations de l'utilisateur
        const { email, firstName, lastName } = user;

        const rendezVous = new RendezVous({
            date,
            heure,
            utilisateur: userId
        });
        await rendezVous.save();

        // Envoyer un e-mail de confirmation à l'utilisateur en utilisant les informations de l'utilisateur
        await sendEmail({ email, firstName, lastName, date, heure });

        response.status(201).json({ message: 'Rendez-vous ajouté avec succès' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Erreur lors de l\'ajout du rendez-vous' });
    }
};

