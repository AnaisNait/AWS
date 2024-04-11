import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import React, { useState } from 'react'; // Import de React et useState pour les états
import '../../App.css'; // Import du style global de l'application

import { FaPowerOff } from "react-icons/fa6"; // Import de l'icône de déconnexion
// Composant Logout
const Logout = ({ destination = '/' }) => {
    const [showPopup, setShowPopup] = useState(false); // État pour afficher ou masquer la popup de confirmation

    // Fonction pour gérer la déconnexion
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5555/user/logout'); // Requête POST pour se déconnecter
            localStorage.removeItem('token'); // Supprimer le token JWT du stockage local
            // Rediriger l'utilisateur vers la page spécifiée dans la propriété "destination" ou vers la page d'accueil par défaut
            window.location.href = destination;
        } catch (error) {
            console.error("Une erreur s'est produite lors de la déconnexion :", error); // Affichage de l'erreur dans la console en cas d'erreur
        }
    };

    // Fonction pour gérer la confirmation de déconnexion
    const handleConfirmLogout = () => {
        handleLogout(); // Exécuter la fonction de déconnexion
        setShowPopup(false); // Cacher la popup après la déconnexion
    };

    return (
        <div className='flex'>
            <button
                onClick={() => setShowPopup(true)} // Afficher la popup au clic sur le bouton
                className='bg-red-800 text-white px-4 py-1 rounded-lg w-fit'
            >
                <FaPowerOff className='text-2xl' />
            </button>
            {showPopup && (
                <div className="popup">
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                    <button onClick={handleConfirmLogout}>Oui</button>
                    <button onClick={() => setShowPopup(false)}>Non</button>
                </div>
            )}
        </div>
    );
};

export default Logout;