/*
  Warnings:

  - Added the required column `id` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_category" ("name") SELECT "name" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");
CREATE TABLE "new_menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_menu" ("desc", "name", "price", "type") SELECT "desc", "name", "price", "type" FROM "menu";
DROP TABLE "menu";
ALTER TABLE "new_menu" RENAME TO "menu";
CREATE UNIQUE INDEX "menu_name_key" ON "menu"("name");
CREATE TABLE "new_movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "length" TEXT NOT NULL
);
INSERT INTO "new_movie" ("desc", "length", "name", "type") SELECT "desc", "length", "name", "type" FROM "movie";
DROP TABLE "movie";
ALTER TABLE "new_movie" RENAME TO "movie";
CREATE UNIQUE INDEX "movie_name_key" ON "movie"("name");
CREATE TABLE "new_game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);
INSERT INTO "new_game" ("desc", "name", "type") SELECT "desc", "name", "type" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
