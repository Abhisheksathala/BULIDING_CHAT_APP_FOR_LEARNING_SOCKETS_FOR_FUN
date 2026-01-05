import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { allusers,allChats,allmessages ,getDashboardStats,adminLogin,adminlogout,getadminData} from '../controllers/adminController.js';
import { adminLoginValidator ,validateHanlder} from '../helpers/validator.js';
import {adminOnly} from "../middlewares/auth.js"

const AdminRouter = express.Router();

AdminRouter.use(adminOnly)
// AdminRouter.get("/",getadminData)
AdminRouter.post("/verify",adminLoginValidator(),validateHanlder,adminLogin)
AdminRouter.post("/logout",adminlogout)
//  only admin
AdminRouter.get("/users",allusers)
AdminRouter.get("/chats",allChats)
AdminRouter.get("/messages",allmessages)
AdminRouter.get("/stats",getDashboardStats)




export default AdminRouter;
