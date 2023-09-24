/*
  Warnings:

  - You are about to drop the `ordered_books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordered_books" DROP CONSTRAINT "ordered_books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ordered_books" DROP CONSTRAINT "ordered_books_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBooks" JSONB[];

-- DropTable
DROP TABLE "ordered_books";
