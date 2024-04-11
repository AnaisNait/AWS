import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import React, { useEffect, useState } from 'react'; // Import de React, useEffect et useState
import { Link } from 'react-router-dom'; // Import de Link pour la navigation dans l'application

// Composant AfficherUser
const AfficherUser = ({ destination = 'user' }) => {
  const [user, setUser] = useState(null); // État pour stocker les données de l'utilisateur
  const token = localStorage.getItem('token'); // Récupération du token JWT depuis le stockage local

  useEffect(() => {
    if (token) { // Vérifier si le token existe avant de faire la requête
      axios
        .get(`http://localhost:5555/user/afficherUser`, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
          },
        })
        .then((response) => {
          setUser(response.data.data); // Mettre à jour l'état avec les données de l'utilisateur récupérées depuis l'API
        })
        .catch((error) => {
          console.log(error); // Afficher l'erreur dans la console en cas d'échec de la requête
        });
    }
  }, [token]); // Exécuter l'effet lorsque le token change

  return (
    <div className="modal fade" id="profilModal" tabIndex="-1" role="dialog" aria-labelledby="profilModalLabel" aria-hidden="true">
      <Link
        to={destination}
      ></Link>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="profilModalLabel">Mes informations</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {user &&
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="clientId">Nom : </label>
                <span id="clientId"> {user.lastName}</span>
              </div>
              <div className="form-group">
                <label htmlFor="clientId">Prenom : </label>
                <span id="clientId">{user.firstName}</span>
              </div>
              <div className="form-group">
                <label htmlFor="clientId">Email : </label>
                <span id="clientId">{user.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="iban">IBAN : </label>
                <span id="iban">{user.iban}</span>
              </div>
              <div className="form-group">
                <label htmlFor="bic">BIC : </label>
                <span id="bic">{user.bic}</span>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="modal fade" id="conseillerModal" tabIndex="-1" role="dialog" aria-labelledby="conseillerModalLabel" aria-hidden="true">


      </div>
    </div>
  );
};

export default AfficherUser;