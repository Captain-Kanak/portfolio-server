/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `technologies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "projects_projectUrl_idx" ON "projects"("projectUrl");

-- CreateIndex
CREATE UNIQUE INDEX "projects_title_key" ON "projects"("title");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_name_key" ON "technologies"("name");
