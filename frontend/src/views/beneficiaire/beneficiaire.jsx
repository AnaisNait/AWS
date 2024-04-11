import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import React, { useEffect, useState } from 'react'; // Import de React, useEffect et useState pour gérer les effets et les états
import { AiOutlineEdit } from 'react-icons/ai'; // Import de AiOutlineEdit pour l'icône d'édition
import { BsInfoCircle } from 'react-icons/bs'; // Import de BsInfoCircle pour l'icône d'information
import { MdOutlineDelete } from 'react-icons/md'; // Import de MdOutlineDelete pour l'icône de suppression
import { Link } from 'react-router-dom'; // Import de Link pour la navigation

// Composant Beneficiaire
const Beneficiaire = ({ destination = 'beneficiaire' }) => {
    // Déclaration de l'état pour stocker la liste des bénéficiaires
    const [benefs, setBenef] = useState([]);
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    // Effet pour charger la liste des bénéficiaires au chargement du composant
    useEffect(() => {
        if (token) { // Vérifier si le token existe avant de faire la requête
            axios
                .get(`http://localhost:5555/beneficiaire/afficherBenef`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then((response) => {
                    setBenef(response.data.data); // Mettre à jour l'état avec les données des bénéficiaires
                })
                .catch((error) => {
                    console.log(error); // En cas d'erreur, log l'erreur dans la console
                });
        }
    }, []); // Exécuter l'effet uniquement lorsque le composant est monté

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
                                                    <h3 className="text-center">Liste des bénéficiaires</h3>
                                                    <br />
                                                    <table className="mx-1 mx-md-4">

                                                        <thead>
                                                            <tr>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">No</th>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">le nom prénom ou raison sociale</th>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">IBAN</th>
                                                                <th className="d-flex flex-row align-items-center mb-4 form-control">ACTION</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {benefs.map((benef, index) => (
                                                                <tr key={benef._id} className='h-8'>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{index + 1}</td>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{benef.nom}</td>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">{benef.iban}</td>
                                                                    <td className="d-flex flex-row align-items-center mb-4 form-control">
                                                                        <div className='flex justify-center gap-x-4'>
                                                                            <Link to={`/detailBenef/${benef._id}`}>
                                                                                <BsInfoCircle className='text-2xl text-green-800' />
                                                                            </Link>
                                                                            <Link to={`/modifierBenef/${benef._id}`}>
                                                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                                            </Link>
                                                                            <Link to={`/supprimerBenef/${benef._id}`}>
                                                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
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

export default Beneficiaire;