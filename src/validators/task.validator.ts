import { z } from 'zod';

export const task_schema=z.object({
    name:z.string(),
    status_id:z.uuidv4(),
    priority_id:z.uuidv4()
})
export type Task = z.infer<typeof task_schema>;

export const update_task_schema = task_schema
    .partial()
    .refine((data) => Object.keys(data).length > 0, { message: 'At least one field is required' });

export const task_id_schema = z.object({
    id: z.uuidv4()
})

export const task_filter_schema = z.object({
    status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    name: z.string().optional(),
})
export type TaskFilters = z.infer<typeof task_filter_schema>;
