import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Email",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Verifique usuário e senha");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Verifique usuário e senha");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Verifique usuário e senha");
        }
        return user;
      },
    }),
  ],
  pages: { signIn: "/" },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, trigger, account, user, session }) {
      if (account) {
        console.log(user);
        token.accessToken = account.access_token;
        token.backgroundImage = user.backgroundImage;
        token.role = user.role;
      }

      if (trigger === "update" && session.user.backgroundImage) {
        token.backgroundImage = session.user.backgroundImage;
      }
      if (trigger === "update" && session.user.image) {
        token.picture = session.user.image;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.backgroundImage = token.backgroundImage;
      session.user.image = token.picture;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
