import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export default function validate<T>(
  schema: ObjectSchema<T>,
  property: keyof Request = 'body'
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      next(
        boom.badRequest(
          error.details.map((detail: any) => detail.message).join(',')
        )
      );
      return;
    }

    (req[property] as T) = value;
    next();
  };
}
