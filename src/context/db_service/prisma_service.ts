import { PrismaClient } from "../../../generated/prisma";

export const prisma = new PrismaClient();

export async function connectToDataBase() {
    try {
        await prisma.$connect();
        console.log("✅ Connected to the database");
    } catch (error) {
        console.error("❌ Error connecting to the database", error);
        throw error;
    }
}