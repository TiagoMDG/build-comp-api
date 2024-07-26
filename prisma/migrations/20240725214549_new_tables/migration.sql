-- CreateTable
CREATE TABLE "Competition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "vote_start" DATETIME NOT NULL,
    "vote_end" DATETIME NOT NULL,
    "max_votes" INTEGER NOT NULL,
    "max_submissions" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competition_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "entry_channel_id" TEXT NOT NULL,
    "forum_post_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" DATETIME,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "invalidated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Entry_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "Competition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entry_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Author_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competition_id" INTEGER NOT NULL,
    "entry_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Vote_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "Competition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "setting" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
