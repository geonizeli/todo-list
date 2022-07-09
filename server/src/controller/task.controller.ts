import { Router } from "express";
import { ProjectDto } from "../dto/poject.dto";
import { ProjectService } from "../service/project.service";
import { TaskService } from "../service/task.service";

const router = Router();
export const TaskRoutes = router;

export const apiNamespace = "/projects/:projectId";

router.get(`${apiNamespace}/tasks`, async (req, res) => {
  let { projectId } = req.params;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  if (!project) {
    res.status(404).json({
      error: "Project not found",
    });
    return;
  }

  const tasks: TaskDto[] = (
    await TaskService.findByProjectId(parsedProjctId)
  ).map((task) => ({
    id: task.id,
    description: task.description,
    createdAt: task.createdAt,
    finishedAt: task.finishedAt,
  }));

  res.json({
    data: tasks,
  });
});

router.post(`${apiNamespace}/tasks`, async (req, res) => {
  let { projectId } = req.params;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  if (!project) {
    res.status(404).json();
    return;
  }

  const task = await TaskService.create(project, {
    description: req.body.description,
  });

  const taskDto: TaskDto = {
    id: task.id,
    createdAt: task.createdAt,
    description: task.description,
    finishedAt: task.finishedAt,
  };

  res.json({
    data: taskDto,
  });
});

router.put(`${apiNamespace}/tasks/:id`, async (req, res) => {
  let { projectId, id } = req.params;
  const { description }: UpdateTaskDto = req.body;

  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  if (!project) {
    res.status(404).json();
    return;
  }

  const task = await TaskService.findByProjectIdAndTaskId(
    parsedProjctId,
    parseInt(id)
  );

  await TaskService.update(task, { description });

  const taskDto: TaskDto = {
    id: task.id,
    createdAt: task.createdAt,
    description: task.description,
    finishedAt: task.finishedAt,
  };

  res.json({
    data: taskDto,
  });
});

router.delete(`${apiNamespace}/tasks/:id`, async (req, res) => {
  let { projectId, id } = req.params;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );

  if (!project) {
    res.status(404).json();
    return;
  }

  const task = await TaskService.findByProjectIdAndTaskId(
    parsedProjctId,
    parseInt(id)
  );

  if (!task) {
    res.status(404).json();
    return;
  }

  const success = await TaskService.destroy(task);

  if (success) {
    res.status(204).json();
  } else {
    res.status(504).json();
  }
});

router.get(`${apiNamespace}/tasks/:id/finish`, async (req, res) => {
  const { projectId, id } = req.params;
  const parsedProjctId = parseInt(projectId);

  const project = await ProjectService.findProjectFromUserById(
    req.userId,
    parsedProjctId
  );


  const task = await TaskService.findByProjectIdAndTaskId(
    parsedProjctId,
    parseInt(id)
  );

  if (!project || !task) {
    res.status(404).json();
    return;
  }

  const result = await TaskService.finish(task);

  const resultDto: TaskDto = {
    id: result.id,
    createdAt: result.createdAt,
    description: result.description,
    finishedAt: result.finishedAt,
  };

  res.json({
    data: resultDto,
  });
});
