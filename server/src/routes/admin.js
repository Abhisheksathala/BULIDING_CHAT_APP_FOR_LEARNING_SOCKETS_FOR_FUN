import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { allusers } from '../controllers/adminController.js';

const AdminRouter = express.Router();


// AdminRouter.get("/")
// AdminRouter.post("/verify")
// AdminRouter.post("/logout")
AdminRouter.get("/users",allusers)
// AdminRouter.get("/chats")
// AdminRouter.get("/messages")
// AdminRouter.get("/stats")




export default AdminRouter;
