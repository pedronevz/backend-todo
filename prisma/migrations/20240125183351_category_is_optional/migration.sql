-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_categoriaId_fkey";

-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
