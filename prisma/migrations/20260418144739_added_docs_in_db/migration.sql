-- CreateTable
CREATE TABLE "PdfDocument" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "size" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfDocument" ADD CONSTRAINT "PdfDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
