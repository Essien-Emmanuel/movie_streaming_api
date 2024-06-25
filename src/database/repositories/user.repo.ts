import { FindOptionsWhere, Repository } from "typeorm";
import { GenericRepo } from "./generics";
import { User } from '../entities/user.entity';
import { Database } from '../connection'

class UserRepository extends GenericRepo<User> {
    constructor(repository: Repository<User>) {
        super(repository);
    }

    getByEmail(email: string) {
        return this.repository.findOneBy({ email } as FindOptionsWhere<User>)
    }
}

let  UserRepo: UserRepository;
Database.createRepository(User, UserRepository).then(data => {
    UserRepo = data 
});

export { UserRepo }
