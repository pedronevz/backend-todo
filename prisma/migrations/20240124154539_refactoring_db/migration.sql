/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "category_name_key";

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "categoriaId" SERIAL NOT NULL,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("categoriaId");

-- DropTable
DROP TABLE "todos";

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_id_fkey" FOREIGN KEY ("id") REFERENCES "category"("categoriaId") ON DELETE RESTRICT ON UPDATE CASCADE;
