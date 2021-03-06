import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../infra/dataSource";
import { userRepository } from "../../repository/user.repository";
import { cleanDataSource } from "../../utils/cleanDataSource";
import { Project } from "../project.entity";
import { User } from "../user.entity";

describe("User", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await cleanDataSource(AppDataSource);
  });
  afterAll(async () => {
    await cleanDataSource(AppDataSource);
    await AppDataSource.destroy();
  });

  describe("relations", () => {
    it("should have many projects", async () => {
      const user = new User();
      const user2 = new User();

      Object.assign(user, {
        name: "John Doe",
        email: faker.internet.email(),
        encryptedPassword: "encryptedPassword",
      });

      Object.assign(user2, {
        name: "Luis Doe",
        email: faker.internet.email(),
        encryptedPassword: "encryptedPassword",
      });

      const project1 = new Project();
      const proejct2 = new Project();

      project1.name = "My first project";
      proejct2.name = "My favorite project";

      user.projects = [project1, proejct2];

      await userRepository.save(user);
      await userRepository.save(user2);

      expect(user.projects).toHaveLength(2);
      expect(user2.projects).toBeUndefined();
    });
  });
});
