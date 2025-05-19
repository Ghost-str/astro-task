import { TaskPriority, TaskStatus } from "../../../prisma/generated";
import { z } from "astro:content";
import { nonSafeObjectKeys } from "../../utils/nonSafeObjectKeys";

export const taskPrioritySchema = z.enum(nonSafeObjectKeys(TaskPriority));
export const taskStatusSchema = z.enum(nonSafeObjectKeys(TaskStatus));
export const taskIdSchema = z.string().uuid();
export const taskTitleSchema = z.string();
export const taskDescriptionSchema = z.string();
export const taskDueSchema = z.string().datetime();
