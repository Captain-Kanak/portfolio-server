/*
  Warnings:

  - You are about to alter the column `password` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - Added the required column `adminId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `technologies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "password" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "technologies" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technologies" ADD CONSTRAINT "technologies_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
