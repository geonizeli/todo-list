import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column({ type: "timestamptz" })
  @IsNotEmpty()
  createdAt: Date;

  @Column({ type: "timestamptz", nullable: true })
  finishedAt?: Date;

  @ManyToOne((_type) => Project, (project) => project.tasks)
  @JoinColumn()
  @IsNotEmpty()
  project: Project;
}
