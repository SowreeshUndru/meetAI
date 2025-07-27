import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { PrismaClient } from "@/generated/prisma";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schema";
import { getServerSession } from "next-auth";

import { z } from "zod"
import { Sql } from "@/generated/prisma/runtime/library";
import { Search } from "lucide-react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
const prisma = new PrismaClient();


export const agentsRouter = createTRPCRouter({
   getMany: protectedProcedure
   .input(
     z
       .object({
         page: z.number().default(DEFAULT_PAGE),
         pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
         search: z.string().nullish()
       })
       .optional()
   )
   .query(async ({ ctx, input }) => {
     const page = input?.page ?? DEFAULT_PAGE;
     const pageSize = input?.pageSize ?? DEFAULT_PAGE_SIZE;
 
     const data = await prisma.agent.findMany({
       where: {
         userId: ctx.auth.user.id,
         ...(input?.search
           ? {
               name: {
                 contains: input.search,
                 mode: 'insensitive', // Optional: case-insensitive search
               },
             }
           : {}),
       },
       orderBy: [
         { createdAt: 'desc' },
         { id: 'desc' },
       ],
       skip: (page - 1) * pageSize,
       take: pageSize,
     });
 
     return data;
   }),
 

   getOne: baseProcedure
      .input(z.object({
         id: z.string(),
      })).query(async ({ input }) => {
         const data = prisma.agent.findFirst({ where: { id: input.id } });
         return data;
      }),




   create: protectedProcedure
      .input(agentsInsertSchema)
      .mutation(async ({ input, ctx }) => {
         console.log(ctx.auth.user.email);
         const createdAgent = await prisma.agent.create({
            data: {
               ...input,
               userId: ctx.auth.user.id
            }
         })
      }),
});