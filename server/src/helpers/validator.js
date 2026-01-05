import { body, validationResult, check, param, query } from 'express-validator';

/*
TODO:this is the user validater
*/

export const registrationValidater = () => [
  body('name', 'Please enter your name').notEmpty(),
  body('username', 'Please enter your username').notEmpty(),
  body('password', 'Please enter your password').notEmpty(),
  body('bio', 'Please enter your bio').notEmpty(),
  check('avatar').notEmpty().withMessage('Please add an avatar 🥲'),
];

export const loginValidater = () => [
  body('identifier', 'Please enter email or username').notEmpty(),
  body('password', 'Please enter your password').notEmpty(),
];

/*
TODO:this is chat validator
*/

export const newGroupValidater = () => [
  body('name', 'Plase enter your username').notEmpty(),
  body('memebers')
    .notEmpty()
    .withMessage('Plase enter members')
    .isArray({ min: 2, max: 100 })
    .withMessage('memebers must be 2-100'),
];

export const addMeneberValidater = () => [
  body('chatId', 'Plase enter chatId').notEmpty(),
  body('memebers')
    .notEmpty()
    .withMessage('Plase enter members')
    .isArray({ min: 2, max: 97 })
    .withMessage('memebers must be 2-100'),
];

export const RemovememberValidater = () => [
  body('chatId', 'Plase enter chatId').notEmpty(),
  body('userIdToRemove', 'plase enter useridtoremove').notEmpty(),
];

export const LeavaeGroup = () => [param('id', 'Plase enter id').notEmpty()];

export const Sendattachments = () => [
  body('chatId', 'Plase enter chatId').notEmpty(),
  check('files')
    .notEmpty()
    .withMessage('Please add an attachments be kind bro🥲')
    .isArray({ min: 1, max: 5 })
    .withMessage('memebers must be 1 - 5'),
  ,
];

export const getmessagevalidater = () => [
  param('id', 'Plase enter chatId').notEmpty(),
  query('page', 'plase sned the page number').notEmpty(),
];

export const ChatIdvalidater = () => [param('id', 'Plase enter chatId').notEmpty()];

export const sendrequestvalidater = () => [body('userId', 'Plase enter user ID').notEmpty()];

export const acceptRequestValidator = ()=>[
body('requestId', 'Plase enter request ID').notEmpty(),
body("accept","please add accept").notEmpty().withMessage("please add accept").isBoolean().withMessage("accept must be a boolean")
];


export const adminLoginValidator = ()=>[
  body("secretKey","plz enter secratekey").notEmpty()
]


export const validateHanlder = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  const errorMessage = error
    .array()
    .map((err) => err.msg)
    .join(', ');

  return res.status(400).json({
    message: errorMessage,
  });
};
