import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { useSnackbar } from 'notistack'; // Import de useSnackbar pour afficher des notifications
import React, { useEffect, useState } from 'react'; // Import de React, useEffect et useState pour gérer les effets et les états
import { useNavigate, useParams } from 'react-router-dom'; // Import de useNavigate et useParams pour la navigation et les paramètres d'URL

// Composant ModifierBenef
const ModifierBenef = () => {
  // Déclaration des états pour le nom, l'IBAN, et la navigation
  const [nom, setNom] = useState('');
  const [iban, setIban] = useState('');
  const navigate = useNavigate(); // Hook de navigation
  const { enqueueSnackbar } = useSnackbar(); // Hook pour afficher des notifications
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
          const { nom, iban } = response.data; // Extraire les données du bénéficiaire depuis la réponse
          setNom(nom); // Mettre à jour l'état du nom avec la valeur récupérée
          setIban(iban); // Mettre à jour l'état de l'IBAN avec la valeur récupérée
        })
        .catch((error) => {
          enqueueSnackbar('Une erreur s\'est produite lors du chargement des données', { variant: 'error' }); // Afficher une notification en cas d'erreur
          console.log(error); // Log de l'erreur dans la console
        });
    }
  }, [id, enqueueSnackbar, token]); // Exécuter l'effet uniquement lorsque l'identifiant du bénéficiaire change ou les dépendances du token et de la notification

  // Fonction pour gérer la modification du bénéficiaire
  const handleModifierBenef = () => {
    const data = { // Création de l'objet avec les données à envoyer dans la requête de modification
      nom,
      iban,
    };
    if (token) { // Vérifier si le token existe avant d'envoyer la requête
      axios
        .put(`http://localhost:5555/beneficiaire/modifierBenef/${id}`, data, { // Requête PUT pour modifier le bénéficiaire avec l'identifiant spécifié
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
          },
        })
        .then(() => {
          enqueueSnackbar('Bénéficiaire modifié avec succès', { variant: 'success' }); // Afficher une notification de succès
          navigate('/solde'); // Rediriger l'utilisateur vers la page des soldes
        })
        .catch((error) => {
          enqueueSnackbar('Erreur lors de la modification du bénéficiaire', { variant: 'error' }); // Afficher une notification en cas d'erreur
          console.log(error); // Log de l'erreur dans la console
        });
    }
  };

  return (

    <div className="modal fade" id="popup-beneficiaire" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{ borderWidth: '0px' }}>
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <form className="mx-1 mx-md-4">
                            <h3 className="text-center">Ajouter bénéficiaire</h3>
                            <br />
                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">

                                <input type="text" value={nom} id="nom" onChange={(e) => setNom(e.target.value)} className="form-control" />
                                <label className="form-label" htmlFor="nom">Renseigner le nom prénom ou raison sociale</label>

                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} id="intitule" className="form-control" />

                                <label className="form-label" htmlFor="intitule">IBAN</label>

                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={() => navigate('/solde')} className="filled-button-secondary" data-dismiss="modal"> Annuler</button>
            <button type="button" onClick={handleModifierBenef} className="filled-button-secondary" data-dismiss="modal"> Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierBenef;