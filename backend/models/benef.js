import mongoose from "mongoose";

const benefSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true,
        unique: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Référence au modèle User
    },
},
    {
        timestamps: true,
    });

const Benef = mongoose.model('Benef', benefSchema); // benefs

export default Benef;
