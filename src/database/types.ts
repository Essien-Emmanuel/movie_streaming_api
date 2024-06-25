import { ObjectLiteral, Repository} from 'typeorm';

export type TEntityRepository<T extends ObjectLiteral, R> = new (repo: Repository<T>) => R;
