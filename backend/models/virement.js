import mongoose from "mongoose";

const virementSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true
    },
    motif: {
        type: String,
        required: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Référence au modèle User
        required: true
    },
    beneficiaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Benef', // Référence au modèle Benef
        required: true
    },
    soldeUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solde', // Référence au modèle Solde
        required: true
    },
},
    {
        timestamps: true,
    }
);

const Virement = mongoose.model('Virement', virementSchema);

export default Virement;