import { NewTaskDto } from "../dto/task.new.dto";
import { Project } from "../entity/project.entity";
import { Task } from "../entity/task.entity";
import { taskRepository } from "../repository/task.repository";

async function finish(task: Task) {
  if (task.finishedAt) {
    throw new Error("Task already finished");
  }

  task.finishedAt = new Date();

  return taskRepository.save(task);
}

async function destroy(task: Task) {
  if (task.finishedAt) {
    throw new Error("You can't destroy a finished task");
  }

  const result = await taskRepository.delete({
    id: task.id,
  });
  return !!result.affected;
}

async function create(project: Project, newTaskDto: NewTaskDto) {
  const task = new Task();

  task.description = newTaskDto.description;
  task.project = project;
  task.createdAt = new Date();

  return taskRepository.save(task);
}

async function findByProjectId(projectId: Project["id"]): Promise<Task[]> {
  return await taskRepository.findBy({ project: { id: projectId } });
}

async function findByProjectIdAndTaskId (projectId: Project['id'], taskId: Task["id"]): Promise<Task> {
  return await taskRepository.findOneBy({ id: taskId, project: { id: projectId } });
}

async function update(task: Task, updateTaskDto: UpdateTaskDto): Promise<Task> {
  taskRepository.merge(task, updateTaskDto);
  return taskRepository.save(task);
}

export const TaskService = {
  finish,
  destroy,
  create,
  update,
  findByProjectId,
  findByProjectIdAndTaskId,
};
