import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import { compare } from 'bcryptjs';
import User from '@/model/User';

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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials, req) {
        await dbConnect();

        // check user existing
        var result = await User.findOne({
          email: credentials?.email,
        });

        if (!result) throw new Error('User does not exist');

        // compare password
        const checkPassword = await compare(
          credentials?.password!,
          result.password
        );
        if (!checkPassword) throw new Error('Invalid credentials');

        const user = {
          id: result?._id,
          name: result?.username,
          email: result?.email,
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

  secret: 'asik',
});
