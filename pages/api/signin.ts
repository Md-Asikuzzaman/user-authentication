import dbConnect from '@/lib/dbConnect';
import User from '@/model/signUp';
import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';

interface Data {}

interface SignInType {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({ message: 'Email Address is required' });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return res.status(404).json({ message: 'Invalid email address' });
    }

    if (!password) {
      return res.status(404).json({ message: 'password is required' });
    } else if (password.length < 8) {
      return res.status(404).json({ message: 'Use at least 8 characters' });
    } else if (password.length > 30) {
      return res.status(404).json({ message: 'Use at most 30 characters' });
    }

    // check existing user
    const existingUser = await User.findOne<SignInType>({ email });

    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist' });

    // compare password
    const comPassword = await compare(password, existingUser.password);

    if (!comPassword)
      return res.status(404).json({ message: 'password not valid' });

    try {
      res.status(200).json({ existingUser });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
