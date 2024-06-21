import 'reflect-metadata';


export function Controller(basePath: string) {
    return function(contructor: Function ) {
        Reflect.defineMetadata()
    }
}