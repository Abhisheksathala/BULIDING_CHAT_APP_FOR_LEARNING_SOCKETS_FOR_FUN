import express from 'express';
import 'dotenv/config';
import { corsconfig } from './src/utils/corsconfig.js';
import cookieParser from 'cookie-parser';
import { errorhandler } from './src/middlewares/error.js';
import { requestLogger, addTimeStamp } from './src/middlewares/globalerrorhandler.js';
import { globalErrorhandler } from './src/middlewares/error.js';
// seeders
import { createUser } from './src/seeders/seeders.js';
// import routes
import userRouter from './src/routes/userRoute.js';
import chatRouter from './src/routes/chatRoute.js';
import AdminRouter from './src/routes/admin.js';

// import server
import { Server } from 'socket.io';
import http from 'http';
import { v4 as uuid } from 'uuid';

import messageModel from "./src/models/messageModel.js"

// constants
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './src/constants/events.js';
import { getSockets } from './src/helpers/Hpelerchat.js';

const app = express();
export const server = http.createServer(app);
export const userSocketIDs = new Map();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.use((socket,next)=>{})

io.on('connection', (socket) => {
  const user = {
    _id: 'asdsad',
    name: 'nagmo',
  };

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(' a user connected', userSocketIDs);
  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid,
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messagefroDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const MembersSocket = getSockets(members)

    io.to(MembersSocket).emit(NEW_MESSAGE,{
      chatId,
      message:messageForRealTime
    })
    io.to(MembersSocket).emit(NEW_MESSAGE_ALERT,{chatId})

  try {
      await messageModel.create(messagefroDB)
  } catch (error) {
    console.log(error)
  }

    console.log('new message', messageForRealTime);
  });
  socket.on('disconnect', () => {
    console.log(' a user disconnected');
    userSocketIDs.delete(user._id.toString())
  });
});

// apis
app.use(corsconfig());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// error handler
app.use(errorhandler);

// global middleware
app.use(requestLogger);
app.use(addTimeStamp);

// global error handler
app.use(globalErrorhandler);

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/admin', AdminRouter);

export default app;

// create users for testing
// createUser(10)
//   .then(() => {
//     console.log('users created successfully');
//   })
//   .catch((error) => console.log(error));
