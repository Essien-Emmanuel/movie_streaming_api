export const MetadataKeys = {
    BASE_PATH: 'base_path',
    ROUTERS: 'routers'
} as const;

export type TMetadataKeys = typeof MetadataKeys;

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
}