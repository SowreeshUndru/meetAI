import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const createTRPCContext = cache(async () => {
  const session = await getServerSession(authOptions);
  return { session }; // Pass session into context
});

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Protected procedure (requires user to be logged in)
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = ctx.session;

  if (!session) {
   redirect("/login");
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});
