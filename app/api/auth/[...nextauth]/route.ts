import { db } from "@/app/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export async function authenticateUser(email: string, plainTextPassword: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
     return null;
  }

  console.log("user", user.password);
  console.log("plainTextPassword", plainTextPassword);

  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  console.log("hashedPassword", hashedPassword);

  const isValid = await bcrypt.compare(plainTextPassword, user.password);
  console.log("isValid", isValid);
  if (!isValid) {
    return null;
  }

  return user;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email= "", password = "" } = credentials ?? {};

        const user = await authenticateUser(email, password);

        if (user) {
          return { id: user.id.toString(), name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
