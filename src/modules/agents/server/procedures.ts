import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { PrismaClient } from "@/generated/prisma";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schema";
import { getServerSession } from "next-auth";

import {z}  from "zod"
import { Sql } from "@/generated/prisma/runtime/library";
const prisma = new PrismaClient();


export const agentsRouter = createTRPCRouter({
   getMany: baseProcedure.query(async ({ ctx }) => {
      const data = await prisma.agent.findMany({});


      return data;
   }),


   getOne:baseProcedure
   .input(z.object({
         id:z.string(),
   })).query(async({input})=>{
      const data=prisma.agent.findFirst({where:{id:input.id}});
      return data;
   }),
   
   
   

   create: protectedProcedure
      .input(agentsInsertSchema)
      .mutation(async ({ input, ctx }) => {
         console.log(ctx.auth.user.email);
         const createdAgent = await prisma.agent.create({
            data: {
               ...input,
               userId:ctx.auth.user.id
            }
         })
      }),
});