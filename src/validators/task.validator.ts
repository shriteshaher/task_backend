import { z } from 'zod';

export const task_schema=z.object({
    name:z.string(),
    status_id:z.uuidv4(),
    priority_id:z.uuidv4()
})
export type Task = z.infer<typeof task_schema>;
