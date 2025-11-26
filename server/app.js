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

const app = express();

// create users for testing
// createUser(10)
//   .then(() => {
//     console.log('users created successfully');
//   })
//   .catch((error) => console.log(error));

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

export default app;
