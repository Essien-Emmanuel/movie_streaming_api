import { DeepPartial, DeleteResult, FindOptionsWhere, ObjectLiteral, Repository, } from 'typeorm';
import { Generic } from '../../entities/generics';
import { IRepository } from './types';

export abstract class GenericRepo<T extends Generic & ObjectLiteral > implements IRepository<T> {
    constructor( private readonly repository: Repository<T>) {}

    getById(id: number): Promise<T | null> {
        return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    }

    getAll(): Promise<T[]> {
        return this.repository.find();
    }

    getSomeByFilter(filterQuery: Partial<T>): Promise<T[]> {
        return this.repository.findBy({ where: filterQuery } as unknown as FindOptionsWhere<T>)
    }

    create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async update(id: number, data: DeepPartial<T>): Promise<T | null> {
        await this.repository.update(id, data);
        return this.getById(id)
       
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}