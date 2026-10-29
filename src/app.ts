import express from 'express'
import router from './router/create-task.route'
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
const environment = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${environment}` });

import { swaggerSpec } from './config/swagger';

export const app=express()

const env= process.env.NODE_ENV 

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/api-docs.json', (_req, res) => { res.json(swaggerSpec) })
app.use(`/api/${env}`,router)
app.use(errorHandler)

