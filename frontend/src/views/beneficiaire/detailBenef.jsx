import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const DetailBenef = () => {
    const [benef, setBenef] = useState({});
    const { id } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
        axios
            .get(`http://localhost:5555/beneficiaire/detailBenef/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                },
            })

            .then((response) => {
                setBenef(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Détails du bénéficiaire</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>le nom prénom ou raison sociale</span>
                    <span>{benef.nom}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>IBAN</span>
                    <span>{benef.iban}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                    <span>{new Date(benef.createdAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                    <span>{new Date(benef.updatedAt).toString()}</span>
                </div>
            </div>
        </div>
    );
};

export default DetailBenef;