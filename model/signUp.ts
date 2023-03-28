import { Schema, model, models } from 'mongoose';

interface SignUpType {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<SignUpType>({
  username: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 150,
    minlength: 8,
  },
});

const User = models.User || model<SignUpType>('User', userSchema);

export default User;
