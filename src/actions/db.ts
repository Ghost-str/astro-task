import { PrismaClient } from "../../prisma/generated";

// TODO настроить connection-pool
const prisma = new PrismaClient({
  datasourceUrl: import.meta.env.DATABASE_URL,
});

export default prisma;
