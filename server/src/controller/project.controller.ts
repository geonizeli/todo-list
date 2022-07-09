import { Router } from "express";
import { ProjectDto } from "../dto/poject.dto";
import { ProjectService } from "../service/project.service";

const router = Router();

const BASE_PATH = "/projects";

export const getAllPath = BASE_PATH;
router.get(getAllPath, async (req, res) => {
  const projects = await ProjectService.listAllByUserId(req.userId)

  const response: ProjectDto[] = projects.map<ProjectDto>(project => ({
    name: project.name
  }))

  res.json(response)
});

export const createPath = BASE_PATH;
router.post(createPath, (req, res) => {
  const { name } = req.body;

  ProjectService.create({
    name,
    userId: req.userId
  }).then(project => {
    const respose: ProjectDto = {
      name: project.name
    }

    res.json(respose);
  }).catch(err => {
    res.status(422).json({
      error: err.message
    });
  })
});

export const ProjectRoutes = router;
