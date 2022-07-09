import { validate } from "class-validator";
import { NewProjectDto } from "../dto/newProject.dto";
import { UpdateProjectDto } from "../dto/updateProject.dto";
import { Project } from "../entity/project.entity";
import { User } from "../entity/user.entity";
import { projectRepository } from "../repository/project.repository";
import { UserService } from "./user.service";

async function create(newProject: NewProjectDto): Promise<Project> {
  const project = new Project();
  const user = await UserService.findUserById(newProject.userId);

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
  updateProjectDto: UpdateProjectDto
): Promise<boolean> {
  projectRepository.merge(project, updateProjectDto);
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
  findProjectFromUserById
};
