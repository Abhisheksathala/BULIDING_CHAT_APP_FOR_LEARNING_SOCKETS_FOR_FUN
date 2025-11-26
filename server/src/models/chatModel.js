import mongoose, { Types } from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: 'User',
    },
    members: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

const chatModel = mongoose.model('chat', chatSchema);

export default chatModel;
