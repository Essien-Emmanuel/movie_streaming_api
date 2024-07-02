export const MetadataKeys = {
    BASE_PATH: 'base-path',
    ROUTERS: 'routers',
    MIDDLEWARE: 'middleware',
    CONTROLLER_CONFIG: 'contoller-config'
} as const;

export type TMetadataKeys = (typeof MetadataKeys)[keyof typeof MetadataKeys];

export const HttpMethods = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
    OPTIONS: 'options'
} as const 

export type THttpMethods = (typeof HttpMethods)[keyof typeof HttpMethods];

export interface IRouter {
    httpMethod: THttpMethods;
    path: string;
    handlerName: string | symbol ;
};

export type TMiddleware = (req: any, res: any, next: any) => void;

export type TControllerOptions = {
    basePath: string;
    use?: TMiddleware[] 
}
