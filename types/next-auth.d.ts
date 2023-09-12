import NextAuth from "next-auth";

import type { DefaultSession, User, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      backgroundImage?: string | null;
      role?: string | null;
    };
  }
  interface User {
    backgroundImage?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
    accessToken?: string;
    backgroundImage?: string | null;
    role?: string | null;
  }
}
