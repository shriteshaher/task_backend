import { Router } from 'express';
import { validate } from '../middleware/validate';
import { task_schema } from '../validators/task.validator';
import { createTask } from '../controller/task.controller';
const router=Router()

/**
 * @openapi
 * /createTask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskApiResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/createTask', validate(task_schema), createTask);




export default router;
