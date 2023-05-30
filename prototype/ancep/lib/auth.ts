import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth/core/types';

// clientId: '11742604971-4loscbibrae5ak24t2lj5t133e15q3ag.apps.googleusercontent.com',
// clientSecret: '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'

export const authOptions: AuthOptions = {
 providers: [
  GoogleProvider({
  name: 'google',
   clientId: process.env.GOOGLE_ID as string,
   clientSecret: process.env.GOOGLE_SECRET as string,
  }),
 ],
 session: {
  strategy: 'jwt',
 },
};
export default NextAuth(authOptions);