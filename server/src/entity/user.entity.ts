import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from "typeorm"
import { Project } from "./project.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    encryptedPassword: string

    @OneToMany((_type) => Project, (item) => item.user)
    projects?: Project[]
}
