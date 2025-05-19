import { defineAction } from "astro:actions";
import { z } from "astro:content";
import prisma from "../db";
import {
  taskDescriptionSchema,
  taskDueSchema,
  taskPrioritySchema,
  taskStatusSchema,
  taskTitleSchema,
} from "./scheamValidation";

const createTaskSchema = z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema.optional(),
  priority: taskPrioritySchema.optional(),
  status: taskStatusSchema.optional(),
  due: taskDueSchema.optional(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;

export const createTask = defineAction({
  input: createTaskSchema,
  async handler(data) {
    const task = await prisma.task.create({ data });
    return task;
  },
});
