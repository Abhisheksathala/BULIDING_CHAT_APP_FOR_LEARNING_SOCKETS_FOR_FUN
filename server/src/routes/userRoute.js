import express from 'express';
import body from 'express-validator';
import {
  login,
  register,
  getUser,
  updateUser,
  logout,
  deleteUser,
  searchUser,
} from '../controllers/userController.js';
import { singleAvater } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

// validater
import { registrationValidater, validateHanlder, loginValidater } from '../helpers/validator.js';

const userRouter = express.Router();

userRouter.post('/register', singleAvater, registrationValidater(), validateHanlder, register);
userRouter.post('/login', loginValidater(), validateHanlder, login);
userRouter.post('/logout', logout);
userRouter.get('/getuser', isAuthenticated, getUser);
userRouter.post('/searchuser', isAuthenticated, searchUser);
// Protected routes
userRouter.put('/updateuser', isAuthenticated, updateUser);
userRouter.delete('/deleteuser', isAuthenticated, deleteUser);

export default userRouter;
