import { createTRPCRouter,baseProcedure } from "@/trpc/init";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();
import { TRPCError } from "@trpc/server";






export const agentsRouter = createTRPCRouter({
 getMany: baseProcedure.query(async ({ ctx }) => {
    const data= await prisma.agent.findMany({});
    
   
    return data;
 })
});