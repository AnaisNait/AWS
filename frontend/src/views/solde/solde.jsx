import { faClock, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import des icônes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import de FontAwesomeIcon pour les icônes
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { format } from "date-fns"; // Import de format pour formater la date
import React, { useEffect, useState } from 'react'; // Import de React et useEffect pour les effets et useState pour gérer les états
import AjouterBenef from '../beneficiaire/ajouterBenef'; // Import du composant AjouterBenef
import Beneficiaire from '../beneficiaire/beneficiaire'; // Import du composant Beneficiaire
import AjouterRendezvous from '../rendezvous/ajouterRendezvous';
import Logout from '../user/logout'; // Import du composant Logout
import AfficherUser from '../user/user'; // Import du composant AfficherUser
import AjouterVirement from '../virement/ajouterVirement'; // Import du composant AjouterVirement
import Virement from '../virement/virement'; // Import du composant Virement
import AjouterSolde from './ajouterSolde'; // Import du composant AjouterSolde

// Composant Solde
const Solde = () => {
  const [soldes, setSolde] = useState([]); // État pour stocker les soldes
  const [date, setDate] = useState(''); // État pour stocker la date
  const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

  useEffect(() => {
    // Obtenez la date actuelle au format souhaité (par exemple, 'dd/MM/yyyy')
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    setDate(currentDate);
    if (token) { // Vérifier si le token existe avant de faire la requête
      axios
        .get('http://localhost:5555/solde/afficherSolde', {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
          },
        })
        .then((response) => {
          setSolde(response.data.data); // Mettre à jour les soldes avec les données reçues de l'API
        })
        .catch((error) => {
          console.log(error); // Afficher l'erreur dans la console en cas d'échec
        });
    }
  }, []); // Exécuter l'effet uniquement lors du premier rendu

  // Gestion des options de navigation
  const [selectedOption, setSelectedOption] = useState('solde');
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Fonction pour afficher le contenu en fonction de l'option sélectionnée
  const renderContent = () => {
    switch (selectedOption) {
      case 'profil':
        return <AfficherUser />;
      case 'ajouterSolde':
        return <AjouterSolde />;
      case 'beneficiaire':
        return <Beneficiaire />;
      case 'ajouterBenef':
        return <AjouterBenef />;
      case 'virement':
        return <AjouterVirement />;
      case 'transactions':
        return <Virement />;
      case 'conseiller':
      return <AjouterRendezvous/>

      case 'solde':
        return (
          <div className="contact-information">
            <div className='flex justify-between items-center'></div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="balance-box">
                    <h3>Solde au {date}</h3>
                    <br />
                    {soldes.length === 0 ? ( // Afficher le solde ou un message si aucun solde n'est disponible
                      <div className="balance" id="balance-amount">0</div>
                    ) : (
                      soldes.map((solde, index) => (
                        <div key={index}>
                          <div className="balance" id="balance-amount">{solde.montant}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Retourner le contenu du composant
  return (
    <div>
      <div>
        <div className="work-hours">
          <FontAwesomeIcon icon={faClock} />
          <span>Lundi/Vendredi 09:00-18:00</span>
          <FontAwesomeIcon icon={faPhone} />
          <span>01321009</span>
        </div>
      </div>
      <header className="navbar">
        <div className="logo">
          <span className="logo-text"><h2>E-Bank</h2></span>
        </div>
        <nav>
          <ul>
            <li><a href="#App.js">Accueil</a></li>
            <li><a href="#nousDecouvrir">Nous Découvrir</a></li>
            <li><a href="#nosServices">Nos Services</a></li>
            <li><a href="#nouContacter">Nous Contacter</a></li>
            <Logout /> {/* Bouton de déconnexion */}
          </ul>
        </nav>
      </header>
      <main>
        <div className='compte-container'>
          <div className="menu">
            <button onClick={() => handleOptionClick('profil')}> Consulter mon profil   </button>
            <button onClick={() => handleOptionClick('solde')}>Consulter mon solde</button>
            <button onClick={() => handleOptionClick('ajouterSolde')}>Ajouter solde</button>
            <button onClick={() => handleOptionClick('beneficiaire')}>Listes des bénéficiaires</button>
            <button onClick={() => handleOptionClick('ajouterBenef')}>Ajouter un bénéficiaire</button>
            <button onClick={() => handleOptionClick('transactions')}>Listes des virements</button>
            <button onClick={() => handleOptionClick('virement')}>Effectuer un nouveau virement</button>
            <button onClick={() => handleOptionClick('conseiller')}>Prendre un rendez-vous</button>
          </div>
          <div className="content">
            {renderContent()} {/* Affichage du contenu en fonction de l'option sélectionnée */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Solde;