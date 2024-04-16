import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { useSnackbar } from 'notistack'; // Import de useSnackbar pour afficher des notifications
import React, { useState } from 'react'; // Import de React et useState pour gérer les états
import { Link, useNavigate } from 'react-router-dom'; // Import de Link pour la navigation et useNavigate pour obtenir une fonction de navigation

// Composant AjouterBenef
const AjouterBenef = ({ destination = 'ajouterBenef' }) => {
  // Déclaration des états pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [iban, setIban] = useState('');
  const navigate = useNavigate(); // pour la navigation
  const { enqueueSnackbar } = useSnackbar(); // pour afficher des notifications

  // Fonction pour ajouter un bénéficiaire
  const handleAjouterBenef = () => {
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    const data = {
      nom,
      iban
    };

    if (!nom || !iban) {
      enqueueSnackbar("Tous les champs doivent être remplis", { variant: "error" });
      return;
    }


    if (token) {
      // Requête HTTP pour ajouter un bénéficiaire
      axios
        .post('http://localhost:5555/beneficiaire/ajouterBenef', data, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
          },
        })
        .then(() => {
          // En cas de succès, afficher une notification, recharger la page et rediriger vers la page solde
          enqueueSnackbar('Bénéficiaire ajouté avec succès', { variant: 'success' });
          window.location.reload(); // Recharger la page pour mettre à jour les données
          navigate('/solde');
        })
        .catch((error) => {
          // En cas d'erreur, afficher une notification et log l'erreur dans la console
          enqueueSnackbar('Erreur lors de l\'ajout du bénéficiaire', { variant: 'error' });
          console.log(error);
        });
    }
  };

  return (
    <div className="modal fade" id="popup-beneficiaire" tabIndex="-1" role="dialog">
      <Link
        to={destination}
      ></Link>
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
            <button type="button" onClick={handleAjouterBenef} className="filled-button-secondary" data-dismiss="modal"> Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterBenef;