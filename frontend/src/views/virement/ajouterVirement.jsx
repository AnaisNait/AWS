import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import React, { useEffect, useState } from 'react'; // Import de React, useEffect et useState
import { Link } from 'react-router-dom'; // Import de Link pour la navigation dans l'application

// Composant AjouterVirement
const AjouterVirement = ({ destination = 'ajouterBenef' }) => {
    // États pour gérer le montant, le motif, la liste des bénéficiaires et le bénéficiaire sélectionné
    const [montant, setMontant] = useState('');
    const [motif, setMotif] = useState('');
    const [beneficiaires, setBeneficiaires] = useState([]);
    const [selectedBeneficiaire, setSelectedBeneficiaire] = useState('');

    // Effet pour récupérer la liste des bénéficiaires lors du chargement du composant
    useEffect(() => {
        const fetchBeneficiaires = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5555/virement/afficherBenefListe', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setBeneficiaires(response.data.data); // Mettre à jour la liste des bénéficiaires avec les données récupérées depuis l'API
                }
            } catch (error) {
                console.log(error); // Afficher l'erreur dans la console en cas d'échec de la requête
            }
        };

        fetchBeneficiaires(); // Appel de la fonction pour récupérer la liste des bénéficiaires
    }, []);

    // Fonction de gestion du changement de montant
    const handleMontantChange = (event) => {
        setMontant(event.target.value); // Mettre à jour l'état du montant avec la nouvelle valeur saisie par l'utilisateur
    };

    // Fonction de gestion du changement de motif
    const handleMotifChange = (event) => {
        setMotif(event.target.value); // Mettre à jour l'état du motif avec la nouvelle valeur saisie par l'utilisateur
    };

    // Fonction de gestion du changement du bénéficiaire sélectionné
    const handleBeneficiaireChange = (event) => {
        setSelectedBeneficiaire(event.target.value); // Mettre à jour l'état du bénéficiaire sélectionné avec la nouvelle valeur choisie par l'utilisateur
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire qui recharge la page

        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('http://localhost:5555/virement/ajouterVirement', {
                    montant,
                    motif,
                    beneficiaireId: selectedBeneficiaire
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Réinitialiser les champs du formulaire après une soumission réussie
                setMontant('');
                setMotif('');
                setSelectedBeneficiaire('');
                alert('Virement créé avec succès'); // Afficher une alerte pour indiquer que le virement a été créé avec succès
            }
        } catch (error) {
            console.error(error); // Afficher l'erreur dans la console en cas d'échec de la requête
            alert('Erreur lors de la création du virement'); // Afficher une alerte pour indiquer qu'une erreur s'est produite lors de la création du virement
        }
    };
    return (
        <div className="modal fade" id="popup-virement" tabIndex="-1" role="dialog">
            <Link
                to={destination}
            ></Link>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="container h-100">
                                <div className="row justify-content-center align-items-center h-100">
                                    <h3 className="text-center">Détails du virement</h3>
                                    <div className="col-lg-12 col-xl-11">
                                        <div className="card text-black" style={{ borderWidth: '0px' }}>
                                            <div className="card-body p-md-5">
                                                <div className="row justify-content-center">
                                                    <div className="mx-1 mx-md-4">
                                                        <div className='row'>
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <input type="number" value={montant} onChange={handleMontantChange} required id="montant" className="form-control" />
                                                                    <i className="fa fa-eur"></i>
                                                                    <label className="form-label" htmlFor="montant">Montant (EUR)</label>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <input type="text" value={motif} onChange={handleMotifChange} required id="motif" className="form-control" />
                                                                    <i className="fa fa-pencil-square"></i>
                                                                    <label className="form-label" htmlFor="motif">Motif</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <div className="form-outline flex-fill mb-0">
                                                                <select id="listeBeneficiaire" value={selectedBeneficiaire} onChange={handleBeneficiaireChange} required className="form-control">
                                                                    <option value="">-- Sélectionnez --</option>
                                                                    {beneficiaires.map(benef => (
                                                                        <option key={benef._id} value={benef._id}>{benef.nom} </option> //- {benef.iban}
                                                                    ))}
                                                                </select>
                                                                <i className="fa fa-address-book"></i>
                                                                <label className="form-label" htmlFor="listeBeneficiaire">Bénéficiaire</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input type="text" value={selectedBeneficiaire ? beneficiaires.find(b => b._id === selectedBeneficiaire).nom : ''} disabled id="motif" className="form-control" />
                                                                <i className="fa fa-pencil-square"></i>
                                                                <label className="form-label" htmlFor="motif">le nom prénom ou raison sociale :</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input type="text" value={selectedBeneficiaire ? beneficiaires.find(b => b._id === selectedBeneficiaire).iban : ''} disabled id="motif" className="form-control" />
                                                                <i className="fa fa-pencil-square"></i>
                                                                <label className="form-label" htmlFor="motif">IBAN :</label>
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
                    <div className="modal-footer">
                        <button type="button" onClick={handleSubmit} className="filled-button-secondary" data-dismiss="modal">Effectuer le virement</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjouterVirement;
