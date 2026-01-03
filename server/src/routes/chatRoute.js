import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {
  newGroupChat,
  getmychats,
  getmygroups,
  addmember,
  removemembers,
  leavegroup,
  sendattachment,
  renamegroup,
  deletechatdetails,
  getchatdetails,
  getmessages,
} from '../controllers/chatController.js';
import { attachmentsMulter } from '../middlewares/multer.js';
import {
  newGroupValidater,
  addMeneberValidater,
  RemovememberValidater,
  LeavaeGroup,
  Sendattachments,
  getmessagevalidater,
  ChatIdvalidater,
} from '../helpers/validator.js';
import { validateHanlder } from '../helpers/validator.js';
const chatRouter = express.Router();

// Define your chat routes here
chatRouter.post(
  '/new-group-chat',
  newGroupValidater(),
  validateHanlder,
  isAuthenticated,
  newGroupChat,
);
chatRouter.get('/my-chats', isAuthenticated, getmychats);

chatRouter.get('/my/my-groups', isAuthenticated, getmygroups);

chatRouter.put('/add-member', addMeneberValidater(), validateHanlder, isAuthenticated, addmember);

chatRouter.put(
  '/remove-member',
  RemovememberValidater(),
  validateHanlder,
  isAuthenticated,
  removemembers,
  Sendattachments,
);

chatRouter.delete('/leave-group/:id', LeavaeGroup(), validateHanlder, isAuthenticated, leavegroup);
chatRouter.post(
  '/send-attachment',
  Sendattachments(),
  validateHanlder,
  attachmentsMulter,
  isAuthenticated,
  sendattachment,
);

chatRouter
  .route('/chat-curd')
  .get(isAuthenticated, getchatdetails)
  .put(isAuthenticated, renamegroup)
  .delete(isAuthenticated, deletechatdetails);
  

chatRouter.get('/message/:id', getmessagevalidater(), validateHanlder, getmessages);

export default chatRouter;
