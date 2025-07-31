import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import {agentsRouter} from '@/modules/agents/server/procedures';
import { roomRouter } from '@/modules/agents/server/videoProcedures';
import { protectedProcedure } from '../init';
import { aiRouter } from '@/modules/agents/server/aiServices';

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  room:roomRouter,
  AI:aiRouter

  
});
// export type definition of API
export type AppRouter = typeof appRouter;