import { faClock, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import des icônes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import de FontAwesomeIcon pour les icônes
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { useSnackbar } from 'notistack'; // Import de useSnackbar pour afficher des messages d'alerte
import React, { useState } from 'react'; // Import de React et useState pour les états
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la navigation
import 'slick-carousel/slick/slick-theme.css'; // Import du style du carrousel
import 'slick-carousel/slick/slick.css'; // Import du style du carrousel
import '../../App.css'; // Import du style global de l'application

// Composant Login
const Login = () => {
    const [email, setEmail] = useState(''); // État pour stocker l'e-mail
    const [password, setPassword] = useState(''); // État pour stocker le mot de passe
    const navigate = useNavigate(); // Fonction de navigation
    const { enqueueSnackbar } = useSnackbar(); // Fonction pour afficher des messages d'alerte

    // Fonction pour gérer la connexion
    const handleLogin = () => {
        const data = {
            email,
            password
        };

        axios
            .post('http://localhost:5555/user/login', data) // Requête POST pour se connecter
            .then((response) => {
                const { token } = response.data; // Récupérer le token JWT depuis la réponse
                localStorage.setItem('token', token); // Stockage du token JWT dans le localStorage
                enqueueSnackbar('Connexion réussie', { variant: 'success' }); // Affichage d'un message de succès
                navigate('/solde'); // Redirection vers la page de solde après connexion
            })
            .catch((error) => {
                enqueueSnackbar('Erreur lors de la connexion', { variant: 'error' }); // Affichage d'un message d'erreur
                console.log(error); // Affichage de l'erreur dans la console
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
                        <li><a href="#App.js">Accueil</a></li>
                        <li><a href="#nousDecouvrir">Nous Découvrir</a></li>
                        <li><a href="#nosServices">Nos Services</a></li>
                        <li><a href="#nouContacter">Nous Contacter</a></li>
                        <li className="nav-item"><a href="" className="filled-button">Déja Client</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="page-heading header-text">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Connectez-vous</h1>
                            </div>
                        </div>
                    </div>
                    <div className="vh-100">
                        <div className="principal-container h-100 mt-3">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-12 col-xl-11">
                                    <div className="card text-black border-0">
                                        <div className="card-body p-md-5">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Connexion</p>
                                                    <div className="mx-1 mx-md-4">
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="formConnexionID" className="formControl" />
                                                                <label className="form-label" htmlFor="formConnexionID">Identifiant</label>
                                                                <br></br>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="formConnexionPass" className="formControl" />
                                                                <label className="form-label" htmlFor="formConnexionPass">Mot de passe</label>
                                                                <br></br>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <button onClick={handleLogin} className="bouton">Se connecter</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;