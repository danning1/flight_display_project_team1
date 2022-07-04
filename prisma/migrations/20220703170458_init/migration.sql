-- CreateTable
CREATE TABLE "game" (
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");
