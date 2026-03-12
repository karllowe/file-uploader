-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "bucket" TEXT,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "storagePath" TEXT;
