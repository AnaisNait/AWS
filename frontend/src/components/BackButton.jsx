import { BsArrowLeft } from 'react-icons/bs'; // Import de l'icône de flèche vers la gauche depuis React-icons
import { Link } from 'react-router-dom'; // Import de la fonction Link de react-router-dom pour la navigation

const BackButton = ({ destination = '/solde' }) => { // Composant BackButton prenant une prop destination, par défaut '/solde'
    return (
        <div className='flex'>
            <Link
                to={destination} // Lien vers la destination spécifiée
                className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit' // Classes CSS pour le style du bouton
            >
                <BsArrowLeft className='text-2xl' />
            </Link>
        </div>
    );
};

export default BackButton; // Export du composant BackButton
