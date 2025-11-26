import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const requestModel = mongoose.model('User', requestSchema);

export default requestModel;
