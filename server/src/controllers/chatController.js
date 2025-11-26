// Import event constants and essential modules
import { ALERT, REFEATCH_CHATS, NEW_MESSAGE, NEW_ATTACHMENT } from '../constants/events.js';
// Helper to find the "other member" in one-to-one chats
import { getothermember } from '../helpers/Hpelerchat.js';
// Mongoose models for chats, users, and messages
import chatModel from '../models/chatModel.js';
import UserModel from '../models/userModel.js';
import messageModel from '../models/messageModel.js';
// Utility to emit socket events and delete files from cloudinary
import { emitEvent, deletfilesfromclodinary } from '../utils/features.js';

/**
 * Create a NEW group chat with detailed explanatory comments
 */
export const newGroupChat = async (req, res) => {
  try {
    // 1. Extract 'name' (group chat title) and 'members' array from the request body
    const { name, members } = req.body;

    // 2. Validate the data: both must exist.
    if (!name || !members) {
      // 400 = Bad Request: Missing required data
      return res.status(400).json({ message: 'Name and members are required', success: false });
    }

    // 3. Enforce minimum of 2 members (excluding creator) to form a group chat.
    if (members.length < 2) {
      // Why 2? Because a meaningful group chat needs at least 3 people: 2 others + creator
      return res.status(400).json({
        message: 'At least 2 members are required for a group chat',
        success: false,
      });
    }

    // 4. Identify the creator (should come from authentication middleware)
    const creator = req.user;

    // 5. Validate creator is authenticated
    if (!creator) {
      return res.status(401).json({ message: 'User not authenticated', success: false });
    }

    // 6. Add the creator to the members array, so the creator is part of the group too
    const allMembers = [...members, creator];

    /*
            For example:
            If members = ['userA', 'userB'] and creator = 'userCreator',
            then allMembers will be ['userA', 'userB', 'userCreator']
        */

    // 7. Use Mongoose model's create() to add a new group chat document in DB
    const chat = await chatModel.create({
      name, // Group's name
      members: allMembers, // All members including creator
      groupChat: true, // This marks the chat as a group chat
      creator: creator, // The creator's user ID
    });

    /*
          This creates a MongoDB document example:
          {
            _id: ObjectId(...),
            name: 'My Group',
            members: ['userA', 'userB', 'userCreator'],
            groupChat: true,
            creator: 'userCreator'
          }
        */

    // 8. Emit a real-time socket ALERT event to ALL members welcoming them
    emitEvent(req, ALERT, allMembers, `Welcome to the group chat ${name}`);

    // 9. Emit REFEATCH_CHATS event for the *provided* members to update their chat lists
    // (Note: Typically the creator should also get this to update their UI)
    emitEvent(req, REFEATCH_CHATS, members);

    // 10. Save the chat document (usually redundant after create() but safe)
    const newchat = await chat.save();

    // 11. Respond with the newly created chat and success message
    return res.status(200).json({
      success: true,
      chat: newchat,
      message: 'Group chat created successfully',
    });
  } catch (error) {
    // 12. Catch any errors, return 500 Internal Server Error with message
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
    });
  }
};

/**
 * Get all chats (both personal and groups) for the logged-in user
 */
export const getmychats = async (req, res) => {
  try {
    // 1. Get user ID from auth middleware (req.user)
    const userId = req.user;

    // 2. If no userId, deny access
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated', success: false });
    }

    // 3. Find all chats where this user is a member
    // Populate member details like name, avatar etc. for UI use
    const chat = await chatModel
      .find({ members: userId })
      .populate('members', 'name avater username email');

    /*
           For example, userId = 'user123'
           MongoDB returns all Chat documents where 'members' includes 'user123'.
        */

    // 4. Transform the chat objects to a minimal usable format for the client
    const transformedChats = chat.map(
      ({ _id, name, groupChat, creator, members, createdAt, updatedAt }) => {
        // 5. For one-to-one chats, find the OTHER member (not current user)
        let otherMember = getothermember(members, userId);

        /*
                  For example, if members = ['user123', 'user456'] and current user is 'user123',
                  then otherMember will be user object of 'user456'.
                */

        return {
          _id,

          // 6. For group chats show the group 'name', else use the other member's name
          name: groupChat ? name : otherMember.name,

          groupChat,

          // 7. Avatars:
          //    For groups - take first 3 member avatars,
          //    For personal chat - avatar of other member only (wrapped in array)
          avater: groupChat ? members.slice(0, 3).map((mem) => mem.avater) : [otherMember.avater],

          creator,

          // 8. Members: list of member IDs excluding current user (useful for sending new messages etc)
          members: members.reduce((prev, curr) => {
            if (curr._id.toString() !== userId.toString()) {
              prev.push(curr._id);
            }
            return prev;
          }, []),

          // 9. Created and updated timestamps
          createdAt,
          updatedAt,
        };
      },
    );

    // 10. Return the transformed chats with success message
    return res.status(200).json({
      success: true,
      chats: transformedChats,
      message: 'Chats fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching chats:', error);

    // 11. Error fallback response
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Get groups where current user is creator (admin)
 */
export const getmygroups = async (req, res) => {
  try {
    // 1. Get current user ID
    const userId = req.user;

    // 2. Authentication check
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated', success: false });
    }

    // 3. Find all groups where user is member AND user is creator(admin)
    const chat = await chatModel
      .find({
        members: userId,
        groupChat: true,
        creator: userId,
      })
      .populate('members', 'name avater username email');

    // 4. If no groups found, return 404
    if (!chat || chat.length === 0) {
      return res.status(404).json({ message: 'No group chats found', success: false });
    }

    // 5. Map groups to minimal info for frontend
    const group = chat.map(({ members, _id, name }) => ({
      _id,
      name,
      // Show avatars of first 3 members for group display
      avater: members.slice(0, 3).map((mem) => mem.avater),
    }));

    // 6. Return groups list to client
    return res.status(200).json({
      success: true,
      group,
      message: 'Group chats fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching group chats:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Add member(s) to an existing group chat
 */
export const addmember = async (req, res) => {
  try {
    // 1. Logged-in user (should be group creator to add members)
    const userId = req.user;

    // 2. Extract chatId and new members from request
    const { chatId, members } = req.body;

    // 3. Validate inputs
    if (!userId) return res.status(401).json({ message: 'User not authenticated', success: false });
    if (!members || members.length === 0)
      return res.status(400).json({ message: 'Members are required', success: false });

    // 4. Find chat by ID
    const chat = await chatModel.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

    // 5. Ensure chat is a group, not personal
    if (!chat.groupChat)
      return res.status(404).json({ message: 'This is not a group chat', success: false });

    // 6. Only creator can add members
    if (chat.creator.toString() !== userId)
      return res
        .status(403)
        .json({ message: 'You are not the creator of this group chat', success: false });

    // 7. Validate each user to add actually exists by fetching from User collection
    const allnewmembersPromise = members.map((id) => UserModel.findById(id, 'name'));
    const allnewmembers = await Promise.all(allnewmembersPromise);

    // 8. If any member not found, error
    if (allnewmembers.includes(null))
      return res.status(404).json({ message: 'One or more members not found', success: false });

    // 9. Filter only new unique members that are not already in the group
    const uniqueMembers = allnewmembers
      .filter((member) => !chat.members.includes(member._id.toString()))
      .map((member) => member._id);

    /*
            Example:
            chat.members = ['u1', 'u2', 'u3']
            members to add = ['u2', 'u4']
           uniqueMembers = ['u4']  // u2 ignored because already in chat
        */

    // 10. Add these unique members to the chat's members list
    chat.members.push(...uniqueMembers);

    // 11. Check group size limit (currently 100, but message says 10, so update as needed)
    if (chat.members.length > 100) {
      return res.status(400).json({
        message: 'Group chat cannot have more than 100 members',
        success: false,
      });
    }

    // 12. Save new chat member list
    const updatedChat = await chat.save();

    // 13. Prepare a user-friendly message including new member names
    const allUsersName = allnewmembers.map((m) => m.name).join(', ');

    // 14. Send alert to all chat members about added people
    emitEvent(
      req,
      ALERT,
      chat.members,
      `You have been added to the group chat ${chat.name}. New members: ${allUsersName}`,
    );

    // 15. Ask all members to refresh chat list UI
    emitEvent(req, REFEATCH_CHATS, chat.members);

    // 16. Respond success
    return res.status(200).json({
      success: true,
      chat: updatedChat,
      message: 'Member added to group chat successfully',
    });
  } catch (error) {
    console.error('Error adding member:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Remove a member from a group chat (only creator can do)
 */
export const removemembers = async (req, res) => {
  try {
    // 1. Extract userId to remove and chatId from request
    const { userIdToRemove, chatId } = req.body;

    // 2. Find chat document to update
    const chat = await chatModel.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

    // 3. Find user to be removed (for alert messages)
    const userToRemove = await UserModel.findById(userIdToRemove, 'name');
    if (!userToRemove) return res.status(404).json({ message: 'User not found', success: false });

    // 4. Confirm this is a group chat
    if (!chat.groupChat)
      return res.status(404).json({ message: 'This is not a group chat', success: false });

    // 5. IMPORTANT: Check if *current requester* is creator (fix logic!):
    if (chat.creator.toString() !== req.user) {
      return res
        .status(403)
        .json({ message: 'You are not the creator of this group chat', success: false });
    }

    // 6. Prevent leaving less than 3 members in the group after removal
    if (chat.members.length <= 3) {
      return res
        .status(400)
        .json({ message: 'Group chat cannot have less than 3 members', success: false });
    }

    // 7. Filter out the member to be removed
    chat.members = chat.members.filter(
      (member) => member && member.toString() !== userIdToRemove.toString(),
    );

    // 8. Save updated chat
    const updatedChat = await chat.save();

    // 9. Notify remaining members that a user was removed
    emitEvent(
      req,
      ALERT,
      chat.members,
      `Member ${userToRemove.name} has been removed from the group chat`,
    );

    // 10. Force members to reload chat data
    emitEvent(req, REFEATCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      chat: updatedChat,
      message: 'Member removed from group chat successfully',
    });
  } catch (error) {
    console.error('Error removing member:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Authenticated user leaves a group chat voluntarily
 */
export const leavegroup = async (req, res) => {
  try {
    // 1. Get chat ID from URL params and current user from auth
    const chatId = req.params.id;
    const userId = req.user;

    // 2. Find chat document
    const chat = await chatModel.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

    // 3. Must be a group chat
    if (!chat.groupChat)
      return res.status(404).json({ message: 'This is not a group chat', success: false });

    // 4. Remove current user from members list
    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== userId.toString(),
    );

    // 5. If creator leaves, assign a new creator randomly from remaining members
    if (chat.creator.toString() === userId) {
      const randomIndex = Math.floor(Math.random() * remainingMembers.length);
      chat.creator = remainingMembers[randomIndex];
    }

    // 6. Update chat member list
    chat.members = remainingMembers;

    // 7. Find current user info (for alert message)
    const user = await UserModel.findById(userId, 'name');
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    // 8. Save chat document
    const updatedChat = await chat.save();

    // 9. Notify remaining members user has left group
    emitEvent(req, ALERT, chat.members, `${user.name} has left the group chat`);

    // 10. Ask members to refresh chat UI
    emitEvent(req, REFEATCH_CHATS, chat.members);

    // 11. Respond success
    return res.status(200).json({
      success: true,
      chat: updatedChat,
      message: 'You have left the group chat successfully',
    });
  } catch (error) {
    console.error('Error leaving group chat:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Send attachments as messages in a chat
 * (Note: this currently lacks actual file upload implementation)
 */
export const sendattachment = async (req, res) => {
  try {
    // 1. Get chat ID and user from request
    const { chatId } = req.body;
    const userId = req.user;

    // 2. Validate inputs
    if (!chatId) return res.status(400).json({ message: 'Chat id is required', success: false });
    if (!userId) return res.status(401).json({ message: 'User not authenticated', success: false });

    // 3. Find chat and user data
    const chat = await chatModel.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

    const user = await UserModel.findById(userId).select('name');
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    // 4. Get files uploaded (from multer or similar)
    const files = req.files || [];

    // 5. Check if any files were uploaded
    if (files.length < 1) {
      return res
        .status(400)
        .json({ message: 'No files uploaded please upload files', success: false });
    }

    /*
           IMPORTANT:
           You *must* implement file uploads here.
           Typically you send files to cloudinary (or other storage),
           then generate 'attachments' array with URLs & public IDs for the message.
           This code currently sets attachments empty: `const attachments = [];`
        */

    // 6. Placeholder empty attachments array
    const attachments = [];

    // 7. Create message object for database saving
    const messageForDB = {
      content: '', // No text content for attachment-only message
      attachments: attachments,
      sender: userId,
      chat: chatId,
    };

    // 8. Prepare message object for real-time event (includes sender info)
    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: userId,
        name: user.name,
      },
      chat: chatId,
    };

    // 9. Create and save message in database
    const messages = await messageModel.create(messageForDB);

    // 10. Emit attachment event with message to all chat members
    emitEvent(req, NEW_ATTACHMENT, chat.members, {
      message: messageForRealTime,
      chatId,
    });

    // 11. Also emit new message event (might be redundant)
    emitEvent(req, NEW_MESSAGE, chat.members, {
      message: messageForDB,
      chatId,
    });

    // 12. Respond success
    return res
      .status(200)
      .json({ message: 'Attachment sent successfully', success: true, messages });
  } catch (error) {
    console.error('Error sending attachment:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Get detailed chat info optionally with populated member data
 */
export const getchatdetails = async (req, res) => {
  try {
    const { chatId, populate } = req.body;
    const userId = req.user;

    // 1. Validate inputs
    if (!chatId) return res.status(400).json({ message: 'Chat id is required', success: false });
    if (!userId) return res.status(401).json({ message: 'User not authenticated', success: false });

    if (populate) {
      /*
               a. Populate members with detailed fields to get richer info for frontend
               .ean() returlns plain JS objects instead of Mongoose documents for faster processing
            */
      const chat = await chatModel
        .findById(chatId)
        .populate('members', 'name avater username email')
        .lean();

      if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

      // b. Normalize avatar property: it can be string or an object with a URL property
      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar?.url || avatar || '',
      }));

      // 2. Return chat with populated members
      return res.status(200).json({ success: true, chat, message: 'Chat found successfully' });
    } else {
      // 3. Simple find without populating members
      const chat = await chatModel.findById(chatId);
      if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

      return res.status(200).json({ success: true, chat, message: 'Chat found successfully' });
    }
  } catch (error) {
    console.error('Error getting chat details:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Rename a group chat
 */
export const renamegroup = async (req, res) => {
  try {
    // 1. Extract chat ID and new name from request
    const { chatId, name } = req.body;
    const userId = req.user;

    // 2. Validate inputs
    if (!chatId) return res.status(400).json({ message: 'Chat id is required', success: false });
    if (!name || name.length < 1)
      return res.status(400).json({ message: 'Chat name is required', success: false });

    // 3. Find chat document
    const chat = await chatModel.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

    // 4. Ensure chat is a group
    if (!chat.groupChat)
      return res.status(404).json({ message: 'This is not a group chat', success: false });

    // 5. Ensure only creator can rename
    if (chat.creator.toString() !== userId)
      return res
        .status(403)
        .json({ message: 'You are not the creator of this chat', success: false });

    // 6. Update chat name and save
    chat.name = name;
    const updatedChat = await chat.save();

    // 7. Respond success with updated chat
    return res
      .status(200)
      .json({ success: true, chat: updatedChat, message: 'Chat renamed successfully' });
  } catch (error) {
    console.error('Error renaming group chat:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * Delete a chat and its messages and attachments
 */
export const deletechatdetails = async (req, res) => {
  try {
    const { chatId } = req.body;
    const userId = req.user;

    // 1. Validate inputs
    if (!chatId) return res.status(400).json({ message: 'Chat id is required', success: false });

    // 2. Find chat doc
    const chat = await chatModel.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found', success: false });

    const members = chat.members;

    // 3. Permission check:
    // If one-to-one chat: only creator (owner) can delete
    if (!chat.groupChat && chat.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not the creator of this chat', success: false });
    }

    // For group chat, user must at least be a member
    if (chat.groupChat && !members.includes(userId)) {
      return res
        .status(403)
        .json({ message: 'You are not a member of this group chat', success: false });
    }

    // 4. Find all messages in the chat which have attachments (non-empty attachments array)
    const messagesWithAttachments = await messageModel.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    // 5. Collect all 'public_id's from attachments to delete from Cloudinary
    const public_ids = [];
    messagesWithAttachments.forEach((message) =>
      message.attachments.forEach((attachment) => public_ids.push(attachment.public_id)),
    );

    // 6. Delete attachments from cloud storage if any
    if (public_ids.length > 0) {
      await deletfilesfromclodinary(public_ids);
    }

    // 7. Delete the chat and all messages belonging to it
    await chat.deleteOne();
    await messageModel.deleteMany({ chat: chatId });

    // 8. Inform chat members to refetch chat data for UI update
    emitEvent(req, REFEATCH_CHATS, members);

    // 9. Respond success
    return res.status(200).json({ success: true, message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat details:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};

/**
 * (INCOMPLETE) - Get all messages for a chat
 * TODO: This function is currently incomplete and needs message fetching logic.
 * TODO: this function ios now complted and fully functional bro
 */
export const getmessages = async (req, res) => {
  const { chatId } = req.params.id;
  const userId = req.user;
  try {
    const { page = 1 } = req.query;

    const resulte_per_page = 20;

    const skip = (page - 1) * resulte_per_page;

    const message = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resulte_per_page)
      .populate('sender', 'name avater ')
      .lean();

    const totalmessagesCount = await messageModel.countDocuments({ chat: chatId });

    const totalpages = Math.ceil(totalmessagesCount / resulte_per_page) || 0;

    return res.status(201).json({
      success: true,
      messages: message.reverse(),
      totalpages,
    });
  } catch (error) {
    console.error('Error gettings messages:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error', success: false });
  }
};
