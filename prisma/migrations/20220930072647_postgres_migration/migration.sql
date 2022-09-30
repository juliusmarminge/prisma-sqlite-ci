-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);
