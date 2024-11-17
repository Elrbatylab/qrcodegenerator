import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.query(
          'SELECT * FROM users WHERE email = $1',
          [credentials.email]
        );

        if (!user.rows[0]) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.rows[0].password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].name,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
}; 