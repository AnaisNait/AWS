import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import React, { useEffect, useState } from "react"; // Import de React, useEffect et useState
import { Link } from 'react-router-dom'; // Import de Link pour la navigation dans l'application

// Composant Virement
const Virement = ({ destination = 'transactions' }) => {
    // État pour stocker la liste des virements
    const [virements, setvirements] = useState([]);
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    // Effet pour récupérer la liste des virements lors du chargement du composant
    useEffect(() => {
        if (token) { // Vérifier si le token existe avant de faire la requête
            axios
                .get(`http://localhost:5555/virement/afficherVirement`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then((response) => {
                    setvirements(response.data.data); // Mettre à jour la liste des virements avec les données récupérées depuis l'API
                })
                .catch((error) => {
                    console.log(error); // Afficher l'erreur dans la console en cas d'échec de la requête
                });
        }
    }, []); // Exécuter l'effet uniquement lorsque le composant est monté (au chargement)

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
                                                    <h3 className="text-center">Liste des virements</h3>
                                                    <br />
                                                    <table className="mx-1 mx-md-4">
                                                        <thead>
                                                            <tr>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">No</th>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">Montant envoyé</th>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">Motif</th>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">Date d'exécution</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {virements.map((virement, index) => (
                                                                <tr key={virement._id} className='h-8'>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{index + 1}</td>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{virement.montant} €</td>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{virement.motif}</td>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{new Date(virement.createdAt).toLocaleDateString("fr")}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
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
    );
};

export default Virement