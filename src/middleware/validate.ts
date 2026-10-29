import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

type RequestSource = 'body' | 'params';

export const validate = (schema: ZodType, source: RequestSource = 'body'): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.issues,
      });
      return;
    }

    if (source === 'body') {
      req.body = result.data;
    }
    next();
  };
};
