import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { PrismaClient } from "@/generated/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { StreamClient } from '@stream-io/node-sdk';

import { streamVideo } from "@/lib/stream-video";
import { generateAvatarUri } from "@/lib/avatar";


const prisma = new PrismaClient();

export const roomRouter = createTRPCRouter({
  createRoom: protectedProcedure
    .input(z.object({ customId: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {

        const call=streamVideo.video.call("default",input.customId)
        await call.create({
          data:{
            created_by :{
              id:ctx.auth.user.id
            },
            custom:{
              meetingId:input.customId,
            },
            settings_override:{
              transcription:{
                language:"en",
                mode:"auto-on",
                closed_caption_mode:"auto-on"
              },
              recording:{
                mode: "auto-on",
                quality:"1080p"
              }
            }
          }
        });

      return await prisma.room.create({
        data: {
          customId: input.customId,
          createdById: ctx.auth.user.id,
        }
      });
    }),

  joinRoom: protectedProcedure
    .input(z.object({ customId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const room = await prisma.room.findUnique({
        where: { customId: input.customId }
      });
      if (!room) throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' });

      return await prisma.session.create({
        data: {
          roomId: room.id,
          userId: ctx.auth.user.id,
        }
      });
    }),

  saveTranscript: protectedProcedure
    .input(z.object({
      roomId: z.string(),
      text: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.session.updateMany({
        where: {
          roomId: input.roomId,
          userId: ctx.auth.user.id
        },
        data: { transcript: input.text }
      });
    }),

  getTranscripts: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await prisma.session.findMany({
        where: { roomId: input.roomId },
        select: { transcript: true, userId: true }
      });
    }),

    generateToken: protectedProcedure
    .input(z.object({
      roomId: z.string().optional()
    }).optional())
    .query(async ({ ctx, input }) => {
      const user = ctx.auth.user;
  
      try {
        await streamVideo.upsertUsers([{
          id: user.id,
          role: "guest", // or "admin" if you trust all users
          image: user.image ?? generateAvatarUri({
            seed: user.email,
            variant: "intials",
          }),
        }]);
  
        const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  
        return streamVideo.generateUserToken({
          user_id: user.id,
          exp: expirationTime,
          validity_in_seconds: 60 * 60,
        });
  
      } catch (error) {
        console.error("Token generation failed:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to generate token" });
      }
    })
  
});