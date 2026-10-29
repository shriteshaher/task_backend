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
