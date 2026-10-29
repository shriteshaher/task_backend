import swaggerJsdoc from 'swagger-jsdoc';

const env = process.env.NODE_ENV || 'development';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for the Task Manager backend',
    },
    servers: [{ url: `/api/${env}`, description: env }],
    components: {
      parameters: {
        TaskId: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      },
      schemas: {
        CreateTaskRequest: {
          type: 'object',
          required: ['name', 'status_id', 'priority_id'],
          properties: {
            name: { type: 'string', example: 'Write documentation' },
            status_id: { type: 'string', format: 'uuid' },
            priority_id: { type: 'string', format: 'uuid' },
          },
        },
        UpdateTaskRequest: {
          type: 'object',
          minProperties: 1,
          properties: {
            name: { type: 'string', example: 'Write documentation' },
            status_id: { type: 'string', format: 'uuid' },
            priority_id: { type: 'string', format: 'uuid' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            prority_id: { type: 'string', format: 'uuid' },
            status_id: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        TaskApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Task created successfully' },
            data: { $ref: '#/components/schemas/Task' },
          },
        },
        TaskListApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Tasks fetched successfully' },
            data: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string', example: 'Task not found' },
            data: { type: 'object', nullable: true, example: null },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', nullable: true },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Validation failed' },
            errors: { type: 'array', items: { type: 'object' } },
          },
        },
      },
    },
  },
  apis: [`${__dirname}/../router/*.{ts,js}`],
};

export const swaggerSpec = swaggerJsdoc(options);
