/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_id_fkey";

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "categoriaId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
