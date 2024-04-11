import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { useSnackbar } from 'notistack'; // Import de useSnackbar pour afficher des notifications
import React, { useState } from 'react'; // Import de React et useState pour gérer les états
import { Link, useNavigate } from 'react-router-dom'; // Import de useNavigate pour la navigation

// Composant AjouterSolde
const AjouterSolde = ({ destination = 'ajouterSolde' }) => {
    const [montant, setMontant] = useState(''); // État pour stocker le montant
    const { enqueueSnackbar } = useSnackbar(); // Hook pour afficher des notifications
    const navigate = useNavigate(); // Hook de navigation

    // Fonction pour gérer l'ajout de solde
    const handleAjouterSolde = () => {
        const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

        const data = {
            montant,
        };
        if (token) { // Vérifier si le token existe
            axios
                .put('http://localhost:5555/solde/ajouterSolde', data, { // Requête PUT pour ajouter du solde
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then(() => {
                    enqueueSnackbar('Solde ajouté avec succès', { variant: 'success' }); // Afficher une notification de succès
                    window.location.reload(); // Recharger la page pour afficher les mises à jour
                    navigate('/solde'); // Rediriger l'utilisateur vers la page des soldes
                })
                .catch((error) => {
                    enqueueSnackbar('Erreur lors de l\'ajout du solde', { variant: 'error' }); // Afficher une notification d'erreur en cas d'échec
                    console.log(error); // Log de l'erreur dans la console
                });
        }
    };
    return (

        <div className="contact-information">
            <Link
                to={destination}
            ></Link>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="balance-box">
                            <h3>Solde</h3>
                            <br />
                            <input type='number' value={montant} onChange={(e) => setMontant(e.target.value)} className="balance" id="balance-amount" />
                            <button type="button" className="filled-button" onClick={handleAjouterSolde}>
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjouterSolde