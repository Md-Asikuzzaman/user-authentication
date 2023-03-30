import { Schema, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface SignUpType {
  username: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<SignUpType>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = models.User || model<SignUpType>('User', userSchema);
export default User;
