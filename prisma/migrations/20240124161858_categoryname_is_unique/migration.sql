/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "category_nome_key" ON "category"("nome");
