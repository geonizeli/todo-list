import { validate } from "class-validator";
import { NewProjectDto } from "../dto/project.new.dto";
import { UpdateProjectDto } from "../dto/project.update.dto";
import { Project } from "../entity/project.entity";
import { User } from "../entity/user.entity";
import { projectRepository } from "../repository/project.repository";
import { UserService } from "./user.service";

async function create(
  userId: User["id"],
  newProject: NewProjectDto
): Promise<Project> {
  const project = new Project();
  const user = await UserService.findUserById(userId);

  project.name = newProject.name;
  project.user = user;

  const errors = await validate(project);

  if (errors.length) {
    throw new Error("Invalid project data");
  }

  return projectRepository.save(project);
}

async function listAllByUserId(userId: User["id"]): Promise<Project[]> {
  const query = projectRepository.createQueryBuilder();
  query.where('"userId" = :userId', { userId });

  return query.getMany();
}

async function destroy(project: Project): Promise<boolean> {
  const query = projectRepository.createQueryBuilder();
  query.where('"id" = :projectId', { projectId: project.id });

  const result = await query.delete().execute();

  return result.affected > 0;
}

async function update(
  project: Project,
  data: UpdateProjectDto
): Promise<boolean> {
  projectRepository.merge(project, data);
  const updateResult = await projectRepository.save(project);

  return !!updateResult;
}

async function findProjectFromUserById(
  userId: User["id"],
  projectId: Project["id"]
): Promise<Project> {
  const query = projectRepository.createQueryBuilder();
  query.where('"userId" = :userId', { userId });
  query.andWhere('"id" = :projectId', { projectId });

  return query.getOne();
}

export const ProjectService = {
  create,
  listAllByUserId,
  destroy,
  update,
  findProjectFromUserById,
};
