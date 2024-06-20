import { TData } from '../core/types';

class TestService {
    static test(): TData {
        return {
            message: 'testing successful',
            data: { test: 'testing the app is a success'}
        }
    }
}

export { TestService }