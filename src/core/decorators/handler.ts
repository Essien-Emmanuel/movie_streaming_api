import "reflect-metadata";
import { THttpMethods, MetadataKeys, IRouter, TMiddleware } from "./types";

export function MethodFactory(httpMethod: THttpMethods) {
  return function (path: string = ""): MethodDecorator {
    return function (
      target: any,
      propertyName: string | symbol,
      _descriptor: PropertyDescriptor
    ) {
      const routers: IRouter[] = Reflect.hasMetadata(
        MetadataKeys.ROUTERS,
        target
      )
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, target)
        : [];

      routers.push({
        httpMethod,
        path,
        handlerName: propertyName,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, target);
    };
  };
}

export function Middleware(middlewares: TMiddleware[]): MethodDecorator {
  return function (
    _target: any,
    _propertyName: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [req, res, next] = args;
      try {
        for (const middleware of middlewares) {
          middleware(req, res, next);
        }
        return originalMethod.apply(this, [...args]);
      } catch (error: any) {
        next(error);
      }
    };
    return descriptor;
  };
}
