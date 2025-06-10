import "dotenv/config";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./db/index";
import { users } from "./db/schema";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Data did not come through");
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .get();
        // const user = mockUser.find((item) => item.email == credentials.email);

        if (!user) {
          throw new Error("Invalid email");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

// const mockUser = [
//   {
//     id: 1,
//     username: "admin",
//     email: "admin@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "admin",
//   },
//   {
//     id: 2,
//     username: "Hanif424",
//     email: "test@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "user",
//   },
//   {
//     id: 3,
//     username: "test353",
//     email: "second@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "user",
//   },
// ];
