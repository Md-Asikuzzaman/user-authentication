import dbConnect from '@/lib/dbConnect';
import User from '@/model/signUp';
import type { NextApiRequest, NextApiResponse } from 'next';

import { hash } from 'bcryptjs';

interface Data {}

interface SignUpType {
  username: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, email, password, confirmPassword } = req.body;

    if (!username)
      return res.status(404).json({ message: 'Username is required' });

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

    if (!confirmPassword) {
      return res.status(404).json({ message: 'Confirm password is required' });
    } else if (password !== confirmPassword) {
      return res.status(404).json({ message: 'Password not matched' });
    }

    // check existing user
    const existingUser = await User.findOne<SignUpType>({ email });

    if (existingUser)
      return res.status(404).json({ message: 'User already exists' });

    try {
      const newUser = await User.create<SignUpType>({
        username,
        email,
        password: await hash(password, 12),
      });

      res.status(201).json(newUser);

      res.json(req.body);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
