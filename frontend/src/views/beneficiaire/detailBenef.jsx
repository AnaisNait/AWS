import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

// Composant DetailBenef
const DetailBenef = () => {
    // Déclaration de l'état pour stocker les détails du bénéficiaire
    const [benef, setBenef] = useState({});
    const { id } = useParams(); // Récupérer l'identifiant du bénéficiaire depuis les paramètres d'URL
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    // Effet pour charger les détails du bénéficiaire au chargement du composant ou lorsque l'identifiant du bénéficiaire change
    useEffect(() => {
        if (token) { // Vérifier si le token existe avant de faire la requête
            axios
                .get(`http://localhost:5555/beneficiaire/detailBenef/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then((response) => {
                    setBenef(response.data); // Mettre à jour l'état avec les détails du bénéficiaire
                })
                .catch((error) => {
                    console.log(error); // En cas d'erreur, log l'erreur dans la console
                });
        }
    }, [id]); // Exécuter l'effet uniquement lorsque l'identifiant du bénéficiaire change

    return (
        <div className="modal fade" id="profilModal" tabIndex="-1" role="dialog" aria-labelledby="profilModalLabel" aria-hidden="true">
            <BackButton />
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="profilModalLabel">Détails du bénéficiaire</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="clientId">le nom prénom ou raison sociale : </label>
                            <span id="clientId"> {benef.nom}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="clientId">IBAN : </label>
                            <span id="clientId">{benef.iban}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="clientId">Date de création : </label>
                            <span id="clientId">{new Date(benef.createdAt).toLocaleDateString("fr")}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="iban">date dernier modification : </label>
                            <span id="iban">{new Date(benef.updatedAt).toLocaleDateString("fr")}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default DetailBenef;