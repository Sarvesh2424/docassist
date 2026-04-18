/*
  Warnings:

  - You are about to drop the `PdfDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PdfDocument" DROP CONSTRAINT "PdfDocument_userId_fkey";

-- DropTable
DROP TABLE "PdfDocument";
