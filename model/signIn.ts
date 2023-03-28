import { Schema, model, models } from 'mongoose';

interface SignInType {
  email: string;
  password: string;
}

const userSchema = new Schema<SignInType>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    maxLength: 50,
    minlength: 8,
  },
});

const User = models.User || model<SignInType>('User', userSchema);

export default User;
