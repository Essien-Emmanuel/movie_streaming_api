import { Entity, Column } from "typeorm";
import { Generic } from './generics';

@Entity()
export class User extends Generic {
    @Column()
    email!: string

    @Column()
    password!: string
}