/*
  Warnings:

  - The values [PACKAGE] on the enum `TechnologyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TechnologyType_new" AS ENUM ('LANGUAGE', 'FRONTEND', 'BACKEND', 'DATABASE', 'ORM', 'DEVOPS', 'CLOUD', 'TOOL', 'TESTING', 'AUTH', 'API', 'MOBILE');
ALTER TABLE "technologies" ALTER COLUMN "type" TYPE "TechnologyType_new" USING ("type"::text::"TechnologyType_new");
ALTER TYPE "TechnologyType" RENAME TO "TechnologyType_old";
ALTER TYPE "TechnologyType_new" RENAME TO "TechnologyType";
DROP TYPE "public"."TechnologyType_old";
COMMIT;
