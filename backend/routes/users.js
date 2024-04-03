import express from "express";
import { afficherUser, login, logout, register } from "../controllers/auth.js";
import checkAuth from '../middlewares/check-auth.js';

const authRouter = express.Router();

authRouter.post('/login', login,checkAuth);

authRouter.post('/register', register);

authRouter.post('/logout', logout);

authRouter.get('/afficherUser',afficherUser,checkAuth)

export default authRouter