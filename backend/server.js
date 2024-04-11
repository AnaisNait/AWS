import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import benefRouter from "./routes/benefs.js";
import rendezvousRouter from './routes/rendezvous.js';
import soldeRouter from "./routes/soldes.js";
import { default as authRouter, default as userRouter } from "./routes/users.js";
import virementRouter from "./routes/virements.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route principale avec un message de bienvenue
app.get('/', (request, response, next) => {
    console.log(request)
    return response.status(234).send('Bienvenue')

});

// Authentification
app.use('/auth', authRouter);

// Routes utilisateur
app.use('/user', userRouter);

// Routes bénéficiaire
app.use('/beneficiaire', benefRouter);

// Routes solde
app.use('/solde', soldeRouter);

// Routes virement
app.use('/virement', virementRouter);

// Routes rendez-vous
app.use('/rendezvous', rendezvousRouter);

// Connexion à MongoDB
mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('Application connectée à la base de données')
        app.listen(process.env.PORT, () => {
            console.log(`L'application écoute sur le port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
