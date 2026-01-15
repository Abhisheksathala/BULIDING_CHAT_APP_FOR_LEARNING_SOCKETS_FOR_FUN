import { hash } from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Exclude password from queries by default
    },
    avater: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    bio: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next()
    this.password = await hash(this.password , 10)
})

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
