import { IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    name: string

    @ManyToOne((_type) => User, (user) => user.projects)
    @JoinColumn()
    @IsNotEmpty()
    user: User
}
