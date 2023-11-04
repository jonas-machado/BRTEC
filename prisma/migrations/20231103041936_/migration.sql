/*
  Warnings:

  - The values [SUPERVISOR,N2,N1,COMERCIAL,RETENCAO,CONTROLE] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserSector" AS ENUM ('SUPERVISOR', 'N2', 'N1', 'COMERCIAL', 'RETENCAO', 'CONTROLE');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sector" "UserSector" NOT NULL DEFAULT 'N1',
ALTER COLUMN "role" SET DEFAULT 'USER';
