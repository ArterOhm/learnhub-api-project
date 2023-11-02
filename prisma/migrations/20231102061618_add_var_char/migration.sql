/*
  Warnings:

  - You are about to alter the column `videoTitle` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `comment` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `creatorName` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "videoTitle" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "videoUrl" SET DATA TYPE VARCHAR,
ALTER COLUMN "comment" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "thumbnailUrl" SET DATA TYPE VARCHAR,
ALTER COLUMN "creatorName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "creatorUrl" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);
