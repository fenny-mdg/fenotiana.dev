-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "replied" BOOLEAN DEFAULT false,
ADD COLUMN     "seen" BOOLEAN DEFAULT false;
