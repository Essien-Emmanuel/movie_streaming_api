import 'reflect-metadata';
import {  MetadataKeys } from './types';

export function Controller(basePath: string) {
    return function(target: Function ) {
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    }
}