import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../infra/dataSource";
import { projectRepository } from "../../repository/project.repository";
import { taskRepository } from "../../repository/task.repository";
import { userRepository } from "../../repository/user.repository";
import { cleanDataSource } from "../../utils/cleanDataSource";

describe("Task", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await cleanDataSource(AppDataSource);
  });
  afterAll(async () => {
    await cleanDataSource(AppDataSource);
    await AppDataSource.destroy();
  });

  describe("relations", () => {
    it("should belongs a one project", async () => {
      const user = await userRepository.save({
        email: faker.internet.email(),
        encryptedPassword: "encryptedPassword",
      });

      const project = await projectRepository.save({
        name: "My first project",
        user,
      });

      const task = await taskRepository.save({
        description: "My first task",
        project,
        createdAt: new Date(),
      });

      expect(task.project.id).toBe(project.id);
    });
  });

  describe("date fields", () => {
    it("should return date fields as Date objects", async () => {
      const user = await userRepository.save({
        email: faker.internet.email(),
        encryptedPassword: "encryptedPassword",
      });

      const project = await projectRepository.save({
        name: "My secound project",
        user,
      });

      const task = await taskRepository.save({
        description: "My secound task",
        project,
        createdAt: new Date(),
        finishedAt: new Date(),
      });

      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.finishedAt).toBeInstanceOf(Date);
    });
  });
});
