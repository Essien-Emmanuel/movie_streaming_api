import { TData } from '../core/types';

class TestService {
    static test(): TData {
        return {
            message: 'testing successful',
            data: { test: 'testing the app is a success #2'}
        }
    }
    static testTwo(): TData {
        return {
            message: 'second testing successful',
            data: { test: 'testing the app is a success foe second #1'}
        }
    }
}

export { TestService }