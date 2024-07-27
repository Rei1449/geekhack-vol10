import { PrismaClient } from "@prisma/client";

declare global {
	var cachePrisma: PrismaClient;
}

let prisma: PrismaClient;

prisma = new PrismaClient();

export const db = prisma;
