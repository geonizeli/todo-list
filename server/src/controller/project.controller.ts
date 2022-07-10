import { Router } from "express";
import { ProjectDto } from "../dto/poject.dto";
import { NewProjectDto } from "../dto/project.new.dto";
import { UpdateProjectDto } from "../dto/project.update.dto";
import { ProjectService } from "../service/project.service";
import {
  CreateResponse,
  DeleteResponse,
  IndexResponse,
  UpdateResponse,
} from "./typings/responses";

export const routes = Router();

export const apiNamespace = "/projects";

routes.get<typeof apiNamespace, IndexResponse<ProjectDto>>(
  apiNamespace,
  async (req, res) => {
    const projects = await ProjectService.listAllByUserId(req.userId);

    res.json({
      data: projects.map<ProjectDto>((project) => ({
        id: project.id,
        name: project.name,
      })),
    });
  }
);

routes.post<
  typeof apiNamespace,
  unknown,
  CreateResponse<ProjectDto>,
  NewProjectDto
>(apiNamespace, (req, res) => {
  const { name } = req.body;

  ProjectService.create(req.userId, {
    name,
  })
    .then((project) => {
      res.json({
        data: {
          id: project.id,
          name: project.name,
        },
      });
    })
    .catch((err) => {
      res.status(422).json({
        errors: [err.message],
      });
    });
});

const putPath = `${apiNamespace}/:id`;
routes.put<
  typeof putPath,
  { id: string },
  UpdateResponse<ProjectDto>,
  UpdateProjectDto
>(putPath, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const projectId = parseInt(id);

  const projectToBeUpdated = await ProjectService.findProjectFromUserById(
    req.userId,
    projectId
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
      errors: ["Project not found"],
    });
  }
});

const deletePath = `${apiNamespace}/:id`;
routes.delete<typeof deletePath, { id: string }, DeleteResponse>(
  deletePath,
  async (req, res) => {
    const { id } = req.params;
    const projectId = parseInt(id);

    const projecToBeDeleted = await ProjectService.findProjectFromUserById(
      req.userId,
      projectId
    );

    if (projecToBeDeleted) {
      const success = await ProjectService.destroy(projecToBeDeleted);

      if (success) {
        res.json({ success });
      } else {
        res.status(422).json({
          errors: ["Could not delete project"],
        });
      }
    } else {
      res.status(404).json({
        errors: ["Project not found"],
      });
    }
  }
);
