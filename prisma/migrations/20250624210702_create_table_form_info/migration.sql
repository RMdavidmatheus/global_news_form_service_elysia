-- CreateTable
CREATE TABLE "formInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_client" TEXT NOT NULL,
    "name_company" TEXT NOT NULL,
    "email_client" TEXT NOT NULL,
    "sector_client" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME
);
