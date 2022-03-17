/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "~/creatRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { PrismaClient, Prisma } from "@prisma/client";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
});

export const postRouter = createRouter()
  // create
  // .mutation("createDraft", {
  //   input: z.object({
  //     data: z.object({
  //       title: z.string().min(10),
  //       content: z.string().min(10),
  //     }),
  //     authorEmail: z.string().email()
  //   }),
  //   async resolve({ input, ctx }) {
  //     const post = await ctx.prisma.post.create({
  //       data: input,
  //       select: defaultPostSelect,
  //     })
  //     return post
  //   },
  // })
  // read
  .query("all", {
    async resolve({ ctx }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return ctx.prisma.post.findMany({
        select: defaultPostSelect,
      });
    },
  });
