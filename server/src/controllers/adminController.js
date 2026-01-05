import userModel from '../models/userModel.js';
import ChatModel from '../models/chatModel.js';
import messageModel from '../models/messageModel.js';
import chatModel from '../models/chatModel.js';

import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;

    if (!secretKey) {
      return res.status(400).json({
        success: false,
        message: 'Secret key is required',
      });
    }

    const adminSecretKey = process.env.ADMIN_SECRET_KEY;

    if (!adminSecretKey) {
      throw new Error('Admin secret key not configured');
    }

    if (secretKey !== adminSecretKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const token = jwt.sign(adminSecretKey, process.env.JWT_SECRET, { expiresIn: '15m' });

    return res
      .status(200)
      .cookie('chattu-admin-token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 15,
      })
      .json({
        success: true,
        message: 'Authenticated successfully, welcome bro',
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const adminlogout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie('chattu-admin-token', '', {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
      })
      .json({
        success: true,
        message: 'logout successfully, welcome bro',
      });
    ('chattu-admin-tooken');
  } catch (error) {
      console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getadminData = async (params) => {

}

export const allusers = async (req, res) => {
  try {
    const users = await userModel.find({});

    const transform = await Promise.all(
      users.map(async ({ name, username, avater, _id }) => {
        const [groups, friends] = await Promise.all([
          ChatModel.countDocuments({ groupChat: true, members: _id }),
          ChatModel.countDocuments({ groupChat: false, members: _id }),
        ]);

        return {
          _id,
          name,
          username,
          avatar: avater?.url || null,
          groups,
          friends,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      users: transform,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({})
      .populate('members', 'name avater')
      .populate('creator', 'name avater');

    const transformChat = await Promise.all(
      chats.map(async ({ members, _id, groupChat, name, creator }) => {
        const totalMessages = await messageModel.countDocuments({
          chat: _id,
        });

        return {
          _id,
          groupChat,
          name,
          avater: members.slice(0, 3).map((member) => member.avater.url),
          members: members.map(({ _id, name, avater }) => {
            return {
              _id,
              name,
              avater: avater.url,
            };
          }),
          creator: {
            // _id:creator._id,
            name: creator.name || 'none',
            avater: creator.avater.url || '',
          },
          totalMembers: members.length,
        };
      }),
    );

    return res.status(500).json({
      success: true,
      message: 'succefuly got',
      chats: transformChat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allmessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({})
      .populate('sender', 'name avater')
      .populate('chat', 'groupChat');

    const transformedMessages = messages.map(
      ({ content, attachments, _id, sender, createdAt, chat }) => {
        return {
          content,
          attachments,
          _id,
          createdAt,
          chat: chat._id,
          groupChat: chat.groupChat,
          sender: {
            _id: sender._id,
            name: sender.name,
            avater: sender.avater.url,
          },
        };
      },
    );

    return res.status(200).json({
      success: true,
      messages: transformedMessages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [groupsCount, userCount, messageCount, totalcount] = await Promise.all([
      chatModel.countDocuments({ groupChat: true }),
      userModel.countDocuments(),
      messageModel.countDocuments(),
      chatModel.countDocuments(),
    ]);

    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await messageModel
      .find({
        createdAt: {
          $gte: last7Days,
          $lte: today,
        },
      })
      .select('createdAt');

    const messages = new Array(7).fill(0);

    last7DaysMessages.forEach((message) => {
      const indexApprox = (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const index = Math.floor(indexApprox);

      message[6 - index];
    });

    const stats = {
      groupsCount,
      userCount,
      messageCount,
      totalcount,
    };

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
