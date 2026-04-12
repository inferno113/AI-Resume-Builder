import express from 'express';
import { getUserById, getUserResumes, loginUser, registerUser } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';


const userRouter = express.Router();


//controller for user registration
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/data',protect, getUserById);

//controller for fetching user resumes
userRouter.get('/resumes',protect, getUserResumes);











export default userRouter;

