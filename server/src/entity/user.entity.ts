import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
