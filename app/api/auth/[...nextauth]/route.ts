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
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.backgroundImage = token.backgroundImage;
      session.user.image = token.picture;
      session.user.role = token.role;
      session.user.sector = token.sector;

      return session;
    },
    async jwt({ token, trigger, account, user, session }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.backgroundImage = user.backgroundImage;
        token.role = user.role;
        token.sector = user.sector;
      }

      if (trigger === "update" && session.user.backgroundImage) {
        token.backgroundImage = session.user.backgroundImage;
      }
      if (trigger === "update" && session.user.image) {
        token.picture = session.user.image;
      }
      if (
        (trigger === "update" && session.user.role) ||
        (trigger === "update" && session.user.sector)
      ) {
        token.role = session.user.role;
        token.sector = session.user.sector;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
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
