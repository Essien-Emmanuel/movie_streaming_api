import { TData } from './types';

export const defineResponse = (data: TData) => {
    return {
        status: 'success',
        message: data.message ?? 'success',
        data: data.data
    }
}