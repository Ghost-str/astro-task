import { defineAction } from "astro:actions";
import { z } from "astro:content";
import prisma from "../db";
import {
  taskDescriptionSchema,
  taskDueSchema,
  taskIdSchema,
  taskPrioritySchema,
  taskStatusSchema,
  taskTitleSchema,
} from "./scheamValidation";
import lodash from "lodash";

export const updateTask = defineAction({
  input: z.object({
    id: taskIdSchema,
    title: taskTitleSchema.optional(),
    description: taskDescriptionSchema.optional(),
    priority: taskPrioritySchema.optional(),
    status: taskStatusSchema.optional(),
    due: taskDueSchema.optional(),
  }),
  async handler(data) {
    const task = await prisma.task.update({
      data: lodash.omitBy(data, (key, value) => {
        return key === "id" || lodash.isUndefined(value);
      }),
      where: {
        id: data.id,
      },
    });

    return task;
  },
});
