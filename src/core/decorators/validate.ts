import { z } from "zod";
import { ValidationError } from "@/src/libs/exceptions";
import { validateSchema } from "@/src/validators";

export const Validate = (schema: z.Schema): MethodDecorator => {
  return (
    _target: any,
    _propertyName: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      const [req, res, next] = args;

      const errors = validateSchema(schema, req.body);

      if (errors.length > 0)
        throw new ValidationError("Invalid Input.", errors);

      return originalMethod.apply(this, [req, res, next]);
    };
    return descriptor;
  };
};
