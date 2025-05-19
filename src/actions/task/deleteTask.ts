import { defineAction } from "astro:actions";
import { taskIdSchema } from "./scheamValidation";
import { z } from "astro:content";
import prisma from "../db";

export const deleteTask = defineAction({
  input: z.object({
    id: taskIdSchema,
  }),
  async handler(data) {
    await prisma.task.delete({
      where: {
        id: data.id,
      },
    });

    return { id: data.id };
  },
});
