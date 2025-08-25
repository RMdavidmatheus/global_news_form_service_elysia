-- CreateTable
CREATE TABLE "formInfo" (
    "id" TEXT NOT NULL,
    "name_client" TEXT NOT NULL,
    "name_company" TEXT NOT NULL,
    "email_client" TEXT NOT NULL,
    "sector_client" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "formInfo_pkey" PRIMARY KEY ("id")
);
