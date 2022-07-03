-- CreateTable
CREATE TABLE "movie" (
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "length" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "menu" (
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "shoppingCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_name_key" ON "movie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_name_key" ON "menu"("name");
