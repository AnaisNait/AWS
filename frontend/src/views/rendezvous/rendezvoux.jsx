import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RensezVous = ({ destination = 'rdv' }) => {
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    };

    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const toggleAppointmentForm = () => {
        setShowAppointmentForm(!showAppointmentForm);
    };

    const handleAjouterRendezVous = () => {
        const token = localStorage.getItem('token');
        const data = {
            date: document.getElementById('appointmentDate').value, // Get date from input
            heure: document.getElementById('appointmentTime').value, // Get time from input
        };
        if (token) {
            axios
                .post('http://localhost:5555/rendezVous/ajouterRendezvous', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    enqueueSnackbar('Rendez-vous ajouté avec succès', { variant: 'success' });
                    window.location.reload();
                    navigate('/solde');
                })
                .catch((error) => {
                    enqueueSnackbar('Erreur lors de l\'ajout du rendez-vous', { variant: 'error' });
                    console.log(error);
                });
        }
    };

    return (
        <div className="rdv-container">
            <Link to={destination}>
                {/* This Link component seems empty. If you want to link somewhere, you should add some content inside. */}
            </Link>
            <h3>Prendre rendez-vous avec un conseiller</h3>
            <div className="calendar-container">
                <input type="date" id="appointmentDate" min={getMinDate()} max={getMaxDate()} />
                <input type="time" id="appointmentTime" min="09:00" max="18:00" />
            </div>
            <div className="button-container">
                <button className="filled-button" onClick={() => { handleAjouterRendezVous(); toggleAppointmentForm(); }}>Valider</button>
                <button  onClick={() => navigate('/solde')}>Annuler</button>

            </div>
        </div>
    );
};

export default RensezVous;
