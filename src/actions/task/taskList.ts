import { defineAction } from "astro:actions";
import { z } from "astro:content";
import prisma from "../db";

export const taskList = defineAction({
  input: z.object({
    page: z.number().optional().default(0),
    perPage: z.number().optional().default(20),
  }),
  async handler({ page, perPage }) {
    const taskList = await prisma.task.findMany({
      skip: page * perPage,
      take: perPage,
      orderBy: {
        priority: "desc",
      },
      select: {
        id: true,
        title: true,
        priority: true,
      },
    });

    return taskList;
  },
});
