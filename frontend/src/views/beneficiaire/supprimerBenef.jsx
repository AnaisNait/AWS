import { useSnackbar } from 'notistack'; // Import de useSnackbar pour afficher des notifications
import React, { useEffect, useState } from 'react'; // Import de React, useEffect et useState pour gérer les effets et les états
import { useNavigate, useParams } from 'react-router-dom'; // Import de useNavigate et useParams pour la navigation et les paramètres d'URL

// Composant SupprimerBenef
const SupprimerBenef = () => {
    const navigate = useNavigate(); // Hook de navigation
    const { id } = useParams(); // Récupérer l'identifiant du bénéficiaire depuis les paramètres d'URL
    const { enqueueSnackbar } = useSnackbar(); // Hook pour afficher des notifications
    const [token, setToken] = useState(''); // État pour stocker le token JWT

    // Effet pour vérifier si l'utilisateur est connecté au chargement du composant
    useEffect(() => {
        const storedToken = localStorage.getItem('token'); // Récupérer le token JWT du stockage local
        if (!storedToken) { // Si le token n'existe pas
            enqueueSnackbar('Vous devez être connecté pour effectuer cette action', { variant: 'error' }); // Afficher une notification d'erreur
            navigate('/login'); // Rediriger vers la page de connexion
        } else { // Si le token existe
            setToken(storedToken); // Mettre à jour l'état du token avec la valeur récupérée
        }
    }, [enqueueSnackbar, navigate]); // Exécuter l'effet uniquement lors du chargement du composant ou lorsque les dépendances changent

    return (

        <div className="modal fade" id="profilModal" tabIndex="-1" role="dialog" aria-labelledby="profilModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="profilModalLabel">Voulez-vous supprimer ce bénéficiaire ?</h3>
                        <button type="button" onClick={() => navigate('/solde')} className="filled-button-secondary" data-dismiss="modal"> Annuler</button>
                        <button type="button" onClick={handleSupprimerBenef} className="filled-button-secondary" data-dismiss="modal"> Oui, supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupprimerBenef;
