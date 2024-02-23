/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Telefone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Telefone_numero_key" ON "Telefone"("numero");
