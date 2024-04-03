import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/logoutButton';

const AfficherUser = () => {

    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    useEffect(() => {
        if (token) { // Vérifier si le token existe avant de faire la requête
            axios
                .get(`http://localhost:5555/auth/afficherUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]); // Exécuter l'effet lorsque le token change

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Profil</h1>
            </div>
            {user && ( // Afficher les données uniquement lorsque l'utilisateur est défini
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>Nom</th>
                            <th className='border border-slate-600 rounded-md'>PRENOM</th>
                            <th className='border border-slate-600 rounded-md'>EMAIL</th>
                            <th className='border border-slate-600 rounded-md'>IBAN</th>
                            <th className='border border-slate-600 rounded-md'>BIC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>{user.firstName}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{user.lastName}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{user.email}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{user.iban}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{user.bic}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            <LogoutButton/>
        </div>
    );
};

export default AfficherUser;