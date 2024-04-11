// Import des bibliothèques nécessaires
import bcrypt from 'bcrypt'; // Pour le hachage de mot de passe
import nodemailer from 'nodemailer'; // Pour l'envoi d'e-mails
import validator from 'validator'; // Pour la validation des données
import User from "../models/user.js"; // Import du modèle d'utilisateur

// Fonction pour envoyer un e-mail de confirmation
function sendEmail({ email, firstName, lastName }) {
    return new Promise((resolve, reject) => {
        // Création d'un transporteur de messagerie avec les informations d'authentification
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email, // Adresse e-mail de l'expéditeur
                pass: process.env.password, // Mot de passe de l'expéditeur
            },
        });

        // Configuration de l'e-mail à envoyer
        const mail_configs = {
            from: `E-bank <${process.env.email}>`, // Adresse e-mail de l'expéditeur
            to: email, // Adresse e-mail du destinataire
            subject: "Confirmation d'inscription à E-Bank", // Sujet de l'e-mail
            text: `Bonjour ${firstName} ${lastName}, votre inscription à E-Bank a été confirmée.`, // Corps de l'e-mail en texte brut
            html: `<p>Bonjour ${firstName} ${lastName}, votre inscription à E-Bank a été confirmée.</p>`, // Corps de l'e-mail en HTML
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

// Contrôleur de l'inscription d'un nouvel utilisateur
export const register = async (requête, réponse) => {
    try {
        // Extraire les données de la requête
        const { firstName, lastName, email, password, verifyEmail, verifyPassword } = requête.body;

        // Vérifier que tous les champs requis sont fournis
        if (!firstName || !lastName || !email || !password || !verifyEmail || !verifyPassword) {
            return réponse.status(400).json({ erreur: "Tous les champs doivent être remplis" });
        }

        // Vérifier que l'e-mail et la vérification de l'e-mail correspondent
        if (email !== verifyEmail) {
            return réponse.status(400).json({ erreur: "L'e-mail et la vérification de l'e-mail ne correspondent pas" });
        }

        // Vérifier que le mot de passe est fort
        if (!validator.isStrongPassword(password)) {
            return réponse.status(400).json({ erreur: "Le mot de passe doit contenir au moins 8 caractères, y compris au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial" });
        }

        // Vérifier que le mot de passe et la vérification du mot de passe correspondent
        if (password !== verifyPassword) {
            return réponse.status(400).json({ erreur: "Le mot de passe et la vérification du mot de passe ne correspondent pas" });
        }

        // Générer un sel pour renforcer le hachage
        const salt = await bcrypt.genSalt(10);

        // Utiliser bcrypt pour hacher le mot de passe avec le sel généré
        const hashedPassword = await bcrypt.hash(password, salt);

        // Fonction pour générer un BIC (Bank Identifier Code)
        function generateBIC() {
            const bankCode = "EBNK"; // Code de la banque
            const countryCode = "FR"; // Code pays

            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Générer 2 caractères aléatoires pour le code de localisation de la branche
            const branchCode = Array.from({ length: 2 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

            // Générer 3 caractères aléatoires pour le code d'emplacement de la filiale
            const locationCode = Array.from({ length: 3 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

            // Concaténer tous les composants pour former le BIC
            return `${bankCode}${countryCode}${branchCode}${locationCode}`;
        }
        const bic = generateBIC();
        console.log(bic);

        // Fonction pour générer un IBAN (International Bank Account Number) unique
        function generateUniqueIban() {
            const country_code = "FR"; // Code pays
            const control_key = "78"; // Clé de contrôle
            const bank_code = "30001"; // Code banque
            const branch_code = "05009"; // Code agence
            const randomDigits = generateRandomDigits(11); // Numéro de compte aléatoire
            const national_check_digit = "06"; // Chiffre d'indicatif national
            return `${country_code}${control_key}${bank_code}${branch_code}${randomDigits}${national_check_digit}`;
        }

        // Fonction pour générer des chiffres aléatoires d'une longueur donnée
        function generateRandomDigits(length) {
            let randomDigits = '';
            for (let i = 0; i < length; i++) {
                randomDigits += Math.floor(Math.random() * 10);
            }
            return randomDigits;
        }

        // Générer un IBAN unique
        const iban = generateUniqueIban();
        console.log(iban);

        // Créer un nouvel utilisateur avec les données fournies dans le corps de la requête
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Utiliser le mot de passe haché
            iban: iban,
            bic: bic
        });

        // Sauvegarder le nouvel utilisateur dans la base de données
        console.log(newUser);
        await newUser.save();

        // Envoyer un e-mail de confirmation à l'utilisateur
        await sendEmail({ email, firstName, lastName });

        // Envoyer une réponse avec un code de statut 201 indiquant que la création du compte a réussi
        réponse.status(201).json({ message: "Compte créé avec succès" });
    } catch (erreur) {
        // En cas d'erreur, envoyer une réponse avec un code de statut 500 et un message d'erreur
        réponse.status(500).json({ erreur: erreur.message });
    }
};
