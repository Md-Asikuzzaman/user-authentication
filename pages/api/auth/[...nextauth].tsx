import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/signIn';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials, request) {
        await dbConnect().catch((err) => err.message);

        // check user existing
        const result = await User.findOne({
          email: credentials?.email,
        });
        if (!result) throw new Error('User does not exist');

        // compare password
        const checkPassword = await compare(
          credentials?.password!,
          result.password
        );
        if (!checkPassword) throw new Error('Invalid credentials');

        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: result._id,
          name: result.username,
          email: result.email,
          image: '/user.png',
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  secret: 'mynameisdevasik',
});
