import UserModel from '../models/userModel.js';
import requestModel from '../models/requestModel.js';
import bcrypt from 'bcrypt';
import chatModel from '../models/chatModel.js';

import { sendToken } from '../utils/sendtoken.js';

import { emitEvent, uploadFilesTocloudinary } from '../utils/features.js';
import { NEW_REQUEST, REFEATCH_CHATS } from '../constants/events.js';
import { getothermember } from '../helpers/Hpelerchat.js';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

// Register user
// name, username, email, password, bio
export const register = async (req, res) => {
  try {
    const { name, username, email, password, bio } = req.body;

    const file = req.file;



    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    if(!file) throw new Error("plz upload an avater")

      const result = await uploadFilesTocloudinary([file])

    const avater = {
      public_id: result[0].public_id || '',
      url: result[0].Url || '',
    };

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number (min 6 characters)',
        success: false,
      });
    }

    const email_exists = await UserModel.findOne({ email });
    const username_exists = await UserModel.findOne({ username });

    // if (email_exists && username_exists) {
    //     return res.status(400).json({ message: 'Email and Username already exist', success: false });
    // }
    if (email_exists) {
      return res.status(400).json({ message: 'Email already exists', success: false });
    }
    if (username_exists) {
      return res.status(400).json({ message: 'Username already exists', success: false });
    }

    const hasspassword = await bcrypt.hash(password, 10);
    const new_user = new UserModel({
      name,
      username,
      email,
      password: hasspassword,
      bio: bio || '',
      avater,
    });

    const saved_user = await new_user.save();

    return sendToken(res, saved_user, 201, 'User registered successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
// login user
// identifier can be email or username
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Username and password are required',
      });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    const user = await UserModel.findOne(
      isEmail ? { email: identifier } : { username: identifier },
    ).select('+password');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password',
      });
    }

    return sendToken(res, user, 200, 'User logged in successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user profile
// Requires authentication
export const getUser = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated', success: false });
    }
    const finduser = await UserModel.findById(userId).select('-password');
    console.log('finduser:', finduser);
    if (!finduser) {
      return res.status(404).json({ message: 'User not found', success: false });
    }
    return res.status(200).json({ success: true, user: finduser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
//
export const logout = (req, res) => {
  try {
  res.clearCookie('chattu-token', '', {
      maxAge: 0,
      httpOnly: true, 
      secure: true,
      sameSite: 'None',
    });
    // Clear the token cookie
    // Optionally, you can also clear the user session or any other related data here
    // For example, if you're using sessions, you might do something like req.session.destroy();
    // Respond with a success message
    return res.status(200).json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
// search user by username
export const searchUser = async (req, res) => {
  try {
    const { name = '' } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'name is required', success: false });
    }
    const Mychat = await chatModel.find({ groupChat: false, members: req.user });

    if (Mychat.length === 0) {
      return res.status(404).json({ message: 'No users found', success: false });
    }

    const alluserFromMychat = Mychat.map((chat) => chat.members).flat();
    // All users from my chats means friends or people i have chatted with
    const allusersExceptmeAndFrined = await UserModel.find({
      _id: { $nin: alluserFromMychat.concat(req.user) },
      name: { $regex: name, $options: 'i' },
    });

    const users = allusersExceptmeAndFrined.map(({ _id, name, avater }) => ({
      _id,
      name,
      avater: avater.url,
    }));

    return res.status(200).json({ success: true, users, message: 'successfull' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// send request
export const sendFriendrequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const request = await requestModel.findOne({
      $or: [
        { receiver: req.user, sender: userId },
        { sender: userId, receiver: req.user },
      ],
    });
    if (request) {
      return res.status(403).json({
        success: false,
        code: ' REQUEST EXIST',
        message: 'Request alredy send',
      });
    }
    await requestModel.create({
      sender: req.user,
      receiver: userId,
    });
    emitEvent(req, NEW_REQUEST, [userId], 'request');
    return res.status(200).json({ message: 'User request  successfully', success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// accept request

export const acceptFriendrequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;
    const request = await requestModel
      .findById(requestId)
      .populate('sender', 'name')
      .populate('receiver', 'name');
    if (!request) {
      return res.status(403).json({
        success: false,
        code: " REQUEST DOES't EXIST",
        message: "Request DOES't EXIST",
      });
    }
    if (request.receiver._id.toString() !== req.user.toString()) {
      return res.status(403).json({
        success: false,
        code: 'unAUTH',
        message: 'you are not authorized to acceot this request',
      });
    }
    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({
        success: false,
        code: 'DELETE',
        message: 'Request deleted successfully',
      });
    }
    const memebers = [receiver.sender._id, receiver.receiver._id];
    await Promise.all([
      chatModel.create({
        memebers,
        name: `${request.sender.name} ${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);
    emitEvent(req, REFEATCH_CHATS, memebers);
    return res.status(200).json({
      message: 'Friend Request Accepted',
      success: true,
      senderId: request.sender._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// get notification

export const getallnotification = async (req, res) => {
  try {
    const request = await requestModel
      .find({ receiver: req.user })
      .populate('sender', 'name avater');
    const allrequests = request.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avater: sender.avater.url,
      },
    }));
    return res.status(200).json({
      success: true,
      requests: allrequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// friends notification

export const getMyFriends = async (req, res) => {
  const chatId = req.query.ChatId;

  try {
    const chats = await chatModel
      .find({
        memebers: req.user,
        groupChat: false,
      })
      .populate('memebers', 'name avater');

    const friends = chats.map(({ members }) => {
      const otherUser = getothermember(members, req.user);
      return {
        _id: otherUser._id,
        name: otherUser.name,
        avater: otherUser.avater?.url || null,
      };
    });

    if (chatId) {
      const chat = await chatModel.findById(chatId);
      const availableFriends = friends.filter((friend) => !chat.memebers.includes(friend._id));

      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({});
    }
  } catch (error) {}
};

export const updateUser = (req, res) => {};
export const deleteUser = (req, res) => {};
