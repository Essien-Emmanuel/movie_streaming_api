import { MethodFactory, Middleware } from "./handler";
import { HttpMethods } from "./types";

export * from './controller';

export const Get = MethodFactory(HttpMethods.GET);
export const Post = MethodFactory(HttpMethods.POST);
export const Put = MethodFactory(HttpMethods.PUT);
export const PATCH = MethodFactory(HttpMethods.PATCH);
export const Delete = MethodFactory(HttpMethods.DELETE);
export const Options = MethodFactory(HttpMethods.OPTIONS);

export { Middleware }