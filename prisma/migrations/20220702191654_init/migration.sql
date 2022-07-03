-- CreateTable
CREATE TABLE "category" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");
