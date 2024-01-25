/*
  Warnings:

  - You are about to drop the column `createAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
