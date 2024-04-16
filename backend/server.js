import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auths.js";
import benefRouter from "./routes/benefs.js";
import rendezVousRouter from './routes/rendezVouss.js';
import soldeRouter from "./routes/soldes.js";
import userRouter from "./routes/users.js";
import virementRouter from "./routes/virements.js";

dotenv.config();

const app = express();
app.use(cors());
// app.use(cors({
//     origin: ["https://what-you-watched.vercel.app", "https://what-you-watched-backend.vercel.app", "http://localhost:5555", "http://localhost:5173"],
//     methods: ["POST", "GET", "PATCH","PUT"],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     preflightContinue: false,
// }));

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

// Routes rendez vous
app.use('/rendezVous', rendezVousRouter);


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
