import { faClock, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import des icônes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import de FontAwesomeIcon pour utiliser des icônes
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { useSnackbar } from 'notistack'; // Import de useSnackbar pour afficher des notifications
import React, { useState } from "react"; // Import de useState pour gérer les états
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la navigation
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../App.css'; // Import des styles CSS

// Composant Register
const Register = () => {
  // Déclaration des états pour les champs du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const navigate = useNavigate(); // pour la navigation
  const { enqueueSnackbar } = useSnackbar(); // pour afficher des notifications

  // Fonction pour vérifier si le mot de passe est fort
  const isStrongPassword = (password) => {
    // Définissez ici vos critères de mot de passe fort
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };
  // Fonction pour gérer l'inscription
  const handleRegister = () => {
    const data = {
      firstName,
      lastName,
      email,
      verifyEmail,
      password,
      verifyPassword
    };

    if (!firstName || !lastName || !email || !verifyEmail || !password || !verifyPassword) {
      enqueueSnackbar("Tous les champs doivent être remplis", { variant: "error" });
      return;
    }

    if (email !== verifyEmail) {
      enqueueSnackbar("L'e-mail et la vérification de l'e-mail ne correspondent pas", { variant: "error" });
      return;
    }

    // Vérifier que le mot de passe est fort
    if (!isStrongPassword(password)) {
      enqueueSnackbar("Le mot de passe doit contenir au moins 8 caractères, y compris au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial", { variant: "error" });
      return;
    }

    if (password !== verifyPassword) {
      enqueueSnackbar("Le mot de passe et la vérification du mot de passe ne correspondent pas", { variant: "error" });
      return;
    }

    // Requête HTTP pour l'inscription
    axios
      .post('http://localhost:5555/auth/register', data)
      .then(() => {
        // En cas de succès, afficher une notification et rediriger vers la page de connexion
        enqueueSnackbar('Utilisateur créé avec succès', { variant: 'success' });
        navigate('/login');
      })
      .catch((error) => {
        // En cas d'erreur, afficher une notification et log l'erreur dans la console
        enqueueSnackbar('Erreur', { variant: 'error' });
        console.log(error);
      });
  };
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
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Découvrir</a></li>
            <li><a href="#">Nos Services</a></li>
            <li><a href="#">Nous Contacter</a></li>
            <li className="nav-item"><a href="http://localhost:5173/login" className="filled-button">Déja Client</a></li>
          </ul>
        </nav>
      </header>
      <div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>Nous rejoindre</h1>
                <span>Remplissez le formulaire ci dessous pour nous rejoindre au plus vite !</span>
              </div>
            </div>
          </div>
        </div>

        <div className="vh-100">
          <div className="container h-100 mt-3">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black border-0">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Inscription</p>
                        <div id="inscriptionForm" className="mx-1 mx-md-4">

                          <div className="form-group">
                            <label >Nom</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" name="prenom" />
                          </div>
                          <div className="form-group">
                            <label >Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" name="email" />
                          </div>
                          <div className="form-group">
                            <label >Vérifier Email</label>
                            <input type="email" value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)} className="form-control" name="email2" />
                          </div>
                          <div className="form-group">
                            <label >Mot de passe</label>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" name="email2" />
                          </div>
                          <div className="form-group">
                            <label >Vérifier Mot de passe</label>
                            <input type='password' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="form-control" name="email2" />
                          </div>
                          <br></br>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button onClick={handleRegister} className="btn"> S'inscrire</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 E-Bank. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Register