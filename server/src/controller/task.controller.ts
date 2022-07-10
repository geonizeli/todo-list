import { Router } from "express";
import { NewTaskDto } from "../dto/task.new.dto";
import { ProjectService } from "../service/project.service";
import { TaskService } from "../service/task.service";
import {
  CreateResponse,
  DeleteResponse,
  IndexResponse,
  ShowResponse,
  UpdateResponse,
} from "./typings/responses";

export const routes = Router();

export const apiNamespace = "/projects/:projectId/tasks";

routes.get<typeof apiNamespace, { projectId: string }, IndexResponse<TaskDto>>(
  apiNamespace,
  async (req, res) => {
    const { projectId } = req.params;
    const parsedProjctId = parseInt(projectId);

    const project = await ProjectService.findProjectFromUserById(
      req.userId,
      parsedProjctId
    );

    if (!project) {
      res.status(404).send("Not found");
    } else {
      const tasks = await TaskService.findByProjectId(parsedProjctId);

      res.json({
        data: tasks.map((task) => ({
          id: task.id,
          description: task.description,
          createdAt: task.createdAt,
          finishedAt: task.finishedAt,
        })),
      });
    }
  }
);

routes.post<
  typeof apiNamespace,
  { projectId: string },
  CreateResponse<TaskDto>,
  NewTaskDto
>(apiNamespace, async (req, res) => {
  let { projectId } = req.params;

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parseInt(projectId)
  );

  if (!project) {
    res.status(404).send("Not found");
  } else {
    const task = await TaskService.create(project, {
      description: req.body.description,
    });

    res.json({
      data: {
        id: task.id,
        createdAt: task.createdAt,
        description: task.description,
        finishedAt: task.finishedAt,
      },
    });
  }
});

const puthPath = `${apiNamespace}/:taskId`;
routes.put<
  typeof puthPath,
  {
    projectId: string;
    taskId: string;
  },
  UpdateResponse<TaskDto>,
  UpdateTaskDto
>(puthPath, async (req, res) => {
  const { projectId, taskId } = req.params;
  const { description }: UpdateTaskDto = req.body;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  if (!project) {
    res.status(404).send("Not found");
  }

  const task = await TaskService.findByProjectIdAndTaskId(
    parsedProjctId,
    parseInt(taskId)
  );

  await TaskService.update(task, { description });

  res.json({
    data: {
      id: task.id,
      createdAt: task.createdAt,
      description: task.description,
      finishedAt: task.finishedAt,
    },
  });
});

const deletePath = `${apiNamespace}/:taskId`;
routes.delete<
  typeof deletePath,
  {
    projectId: string;
    taskId: string;
  },
  DeleteResponse
>(deletePath, async (req, res) => {
  let { projectId, taskId } = req.params;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  const task = await TaskService.findByProjectIdAndTaskId(
    parsedProjctId,
    parseInt(taskId)
  );

  if (!project || !task) {
    res.status(404).send("Not found");
  } else {
    const success = await TaskService.destroy(task);

    res.status(success ? 204 : 505).json({
      success,
    });
  }
});

const finishPath = `${apiNamespace}/:taskId/finish`;
routes.get<
  typeof finishPath,
  {
    projectId: string;
    taskId: string;
  },
  ShowResponse<TaskDto>
>(finishPath, async (req, res) => {
  const { projectId, taskId } = req.params;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  const task = await TaskService.findByProjectIdAndTaskId(
    parsedProjctId,
    parseInt(taskId)
  );

  if (!project || !task) {
    res.status(404).json();
  } else {
    await TaskService.finish(task);

    res.json({
      data: {
        id: task.id,
        createdAt: task.createdAt,
        description: task.description,
        finishedAt: task.finishedAt,
      },
    });
  }
});
