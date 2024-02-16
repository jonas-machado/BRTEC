"use client";

import { User } from "@prisma/client";

interface Sector {
  sector: string;
  children: React.ReactNode;
  user: User;
}

export default function SectorOnly({ sector, children, user }: Sector) {
  return <>{user.sector === sector && children}</>;
}
