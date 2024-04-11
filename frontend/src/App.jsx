import React from "react";
import { Route, Routes } from 'react-router-dom'; // Import des composants Route et Routes de react-router-dom
import Home from './views/Home'; // Import du composant Home
import Register from './views/auth/register'; // Import du composant Register pour l'inscription

import Login from "./views/user/login"; // Import du composant Login pour la connexion
import Logout from "./views/user/logout"; // Import du composant Logout pour la déconnexion
import AfficherUser from "./views/user/user"; // Import du composant AfficherUser pour afficher les informations de l'utilisateur

import AjouterBenef from "./views/beneficiaire/ajouterBenef"; // Import du composant AjouterBenef pour ajouter un bénéficiaire
import Beneficiaire from './views/beneficiaire/beneficiaire'; // Import du composant Beneficiaire pour afficher la liste des bénéficiaires
import DetailBenef from "./views/beneficiaire/detailBenef"; // Import du composant DetailBenef pour afficher les détails d'un bénéficiaire
import ModifierBenef from "./views/beneficiaire/modifierBenef"; // Import du composant ModifierBenef pour modifier un bénéficiaire
import SupprimerBenef from "./views/beneficiaire/supprimerBenef"; // Import du composant SupprimerBenef pour supprimer un bénéficiaire

import AjouterVirement from "./views/virement/ajouterVirement"; // Import du composant AjouterVirement pour ajouter un virement
import Virement from "./views/virement/virement"; // Import du composant Virement pour afficher la liste des virements

import AjouterSolde from "./views/solde/ajouterSolde"; // Import du composant AjouterSolde pour ajouter un solde
import Solde from "./views/solde/solde"; // Import du composant Solde pour afficher le solde

import AjouterRendezvous from "./views/rendezvous/ajouterRendezvous"; // Import du composant AjouterRendezvous pour ajouter un rendezvous

const App = () => {
  return (
    <Routes>
      {/* Routes pour chaque vue */}
      <Route path='/' element={<Home />} /> {/* Route pour la page d'accueil */}
      <Route path='/register' element={<Register />} /> {/* Route pour l'inscription */}

      <Route path='/login' element={<Login />} /> {/* Route pour la connexion */}
      <Route path='/logout' element={<Logout />} /> {/* Route pour la déconnexion */}
      <Route path='/user' element={<AfficherUser />} /> {/* Route pour afficher les informations de l'utilisateur */}

      <Route path='/beneficiaire' element={<Beneficiaire />} /> {/* Route pour afficher la liste des bénéficiaires */}
      <Route path='/ajouterBenef' element={<AjouterBenef />} /> {/* Route pour ajouter un bénéficiaire */}
      <Route path='/detailBenef/:id' element={<DetailBenef />} /> {/* Route pour afficher les détails d'un bénéficiaire */}
      <Route path='/modifierBenef/:id' element={<ModifierBenef />} /> {/* Route pour modifier un bénéficiaire */}
      <Route path='/supprimerBenef/:id' element={<SupprimerBenef />} /> {/* Route pour supprimer un bénéficiaire */}

      <Route path='/solde' element={<Solde />} /> {/* Route pour afficher le solde */}
      <Route path='/ajouterSolde' element={<AjouterSolde />} /> {/* Route pour ajouter un solde */}

      <Route path='/virement' element={<Virement />} /> {/* Route pour afficher la liste des virements */}
      <Route path='/ajoutervirement' element={<AjouterVirement />} /> {/* Route pour ajouter un virement */}

      <Route path='/Ajouterrendezvous' element={<AjouterRendezvous />} /> {/* Route pour ajouter un virement */}
    </Routes>
  )
}

export default App;
