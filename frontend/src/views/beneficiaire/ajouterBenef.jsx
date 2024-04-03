import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const AjouterBenef = () => {
    const [nom, setNom] = useState('');
    const [iban, setIban] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleAjouterBenef = () => {
        const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

        const data = {
            nom,
            iban
        };
        if (token) {
        axios
            .post('http://localhost:5555/beneficiaire/ajouterBenef', data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                },
            })
            .then(() => {
                enqueueSnackbar('Bénéficiaire ajouté avec succès', { variant: 'success' });
                navigate('/beneficiaire');
            })
            .catch((error) => {
                enqueueSnackbar('Erreur lors de l\'ajout du bénéficiaire', { variant: 'error' });
                console.log(error);
            });
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Créer un bénéficiaire</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Renseigner le nom prénom ou raison sociale</label>
                    <input
                        type='text'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>IBAN</label>
                    <input
                        type='text'
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleAjouterBenef}>
                    Sauvegarder
                </button>
            </div>
        </div>
    );
};

export default AjouterBenef;