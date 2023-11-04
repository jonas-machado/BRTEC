import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import type { DefaultSession, User, DefaultUser, TokenSet } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import type { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: UserId;
      backgroundImage?: User.backgroundImage;
      role?: UserRole;
    };
  }
  interface User {
    id?: UserId;
    backgroundImage?: User.backgroundImage;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: User.id;
    role: UserRole;
    backgroundImage?: User.backgroundImage;
  }
}
