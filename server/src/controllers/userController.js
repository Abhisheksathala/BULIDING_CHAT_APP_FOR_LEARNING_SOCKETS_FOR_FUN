import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

import { sendToken } from '../utils/sendtoken.js';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

// Register user
// name, username, email, password, bio
export const register = async (req, res) => {
  try {
    const { name, username, email, password, bio } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const avater = {
      public_id: 'ffsdfdsfs' || '',
      url: 'req.file?.path' || '',
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
      return res
        .status(400)
        .json({ message: 'Email or username and password are required', success: false });
    }
    if (!identifier) {
      return res.status(400).json({ message: 'Email or username is required', success: false });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required', success: false });
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    const user = await UserModel.findOne(
      isEmail ? { email: identifier } : { username: identifier },
    ).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'user dont exist', success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid  password', success: false });
    }
    return sendToken(res, user, 200, 'User logged in successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
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
export const logout = (req, res) => {
  try {
    const token = res.clearCookie('chattu-token', '', {
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
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'name is required', success: false });
    }
    const users = await UserModel.find({ name: { $regex: name, $options: 'i' } })
      .select('-password')
      .limit(1);
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found', success: false });
    }
    return res.status(200).json({ success: true, users, message: 'Users found' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateUser = (req, res) => {};
export const deleteUser = (req, res) => {};
