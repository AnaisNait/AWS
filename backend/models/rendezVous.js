import mongoose from "mongoose";

const rendezVousSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    heure: {
        type: String,
        required: true,
        unique: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Référence au modèle User
    }
},
    {
        timestamps: true,
    }
);

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

export default RendezVous;