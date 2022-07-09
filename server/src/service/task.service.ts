import { NewTaskDto } from "../dto/newTaskDto";
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

  return taskRepository.delete(task);
}

async function create(newTaskDto: NewTaskDto, project: Project) {
  const task = new Task();

  task.description = newTaskDto.description;
  task.project = project;

  return taskRepository.save(task);
}

export const TaskService = {
  finish,
  destroy,
  create,
};
