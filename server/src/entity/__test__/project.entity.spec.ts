import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../infra/dataSource";
import { projectRepository } from "../../repository/project.repository";
import { userRepository } from "../../repository/user.repository";
import { cleanDataSource } from "../../utils/cleanDataSource";

describe("Project", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await cleanDataSource(AppDataSource);
  });
  afterAll(async () => {
    await cleanDataSource(AppDataSource);
    await AppDataSource.destroy();
  });

  describe("relations", () => {
    it("should belongs a one user", async () => {
      const user = await userRepository.save({
        name: "John Doe",
        email: faker.internet.email(),
        encryptedPassword: "encryptedPassword",
      });

      const project = await projectRepository.save({
        name: "My first project",
        user,
      });

      expect(project.user.id).toBe(user.id);
    });
  });
});
