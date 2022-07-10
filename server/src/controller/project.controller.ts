import { Router } from "express";
import { ProjectDto } from "../dto/poject.dto";
import { NewProjectDto } from "../dto/project.new.dto";
import { UpdateProjectDto } from "../dto/project.update.dto";
import { ProjectService } from "../service/project.service";
import {
  CreateResponse, DeleteResponse, IndexResponse,
  UpdateResponse
} from "./typings/responses";

const router = Router();
export const ProjectRoutes = router;

export const apiNamespace = "/projects";

router.get<typeof apiNamespace, IndexResponse<ProjectDto>>(
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

router.post<typeof apiNamespace, unknown, CreateResponse<ProjectDto>, NewProjectDto>(
  apiNamespace,
  (req, res) => {
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
  }
);

const putPath = `${apiNamespace}/:taskId`;
router.put<typeof putPath, { taskId: string }, UpdateResponse<ProjectDto>, UpdateProjectDto>(
  putPath,
  async (req, res) => {
    const { taskId } = req.params;
    const { name } = req.body;
    const projectId = parseInt(taskId);

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
  }
);

const deletePath = `${apiNamespace}/:taskId`;
router.delete<typeof deletePath, { taskId: string }, DeleteResponse>(
  deletePath,
  async (req, res) => {
    const { taskId } = req.params;
    const projectId = parseInt(taskId);

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
