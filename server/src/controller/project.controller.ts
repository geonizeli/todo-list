import { Router } from "express";
import { ProjectDto } from "../dto/poject.dto";
import { ProjectService } from "../service/project.service";

const router = Router();

export const apiNamespace = "/projects";

router.get(apiNamespace, async (req, res) => {
  const projects = await ProjectService.listAllByUserId(req.userId);

  const response: ProjectDto[] = projects.map<ProjectDto>((project) => ({
    id: project.id,
    name: project.name,
  }));

  res.json(response);
});

router.post(apiNamespace, (req, res) => {
  const { name } = req.body;

  ProjectService.create({
    name,
    userId: req.userId,
  })
    .then((project) => {
      const respose: ProjectDto = {
        id: project.id,
        name: project.name,
      };

      res.json(respose);
    })
    .catch((err) => {
      res.status(422).json({
        error: err.message,
      });
    });
});

router.put(`${apiNamespace}/:id`, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const projectId = parseInt(id);

  const userProjects = await ProjectService.listAllByUserId(req.userId);
  const projectToBeUpdated = userProjects.find(
    (project) => project.id === projectId
  );

  if (projectToBeUpdated) {
    ProjectService.update(projectToBeUpdated, {
      name,
    }).then((success) => {
      if (success) {
        res.status(204).json();
      } else {
        res.status(402).json();
      }
    });
  } else {
    res.status(404).json({
      error: "Project not found",
    });
  }
});

router.delete(`${apiNamespace}/:id`, async (req, res, next) => {
  const { id } = req.params;
  const projectId = parseInt(id);

  const userProjects = await ProjectService.listAllByUserId(req.userId);
  const projecToBeDeleted = userProjects.find(
    (project) => project.id === projectId
  );

  if (projecToBeDeleted) {
    const success = await ProjectService.destroy(projecToBeDeleted);

    if (success) {
      res.json({ success });
    } else {
      res.status(422).json({
        error: "Could not delete project",
      });
    }
  } else {
    res.status(404).json({
      error: "Project not found",
    });
  }
});

export const ProjectRoutes = router;
