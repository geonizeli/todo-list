import { AppDataSource } from "../../infra/dataSource";
import { projectRepository } from "../../repository/project.repository";
import { userRepository } from "../../repository/user.repository";
import { cleanDataSource } from "../../utils/cleanDataSource";

describe("Project", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await cleanDataSource(AppDataSource, ["project", "user"]);
  });

  describe("relations", () => {
    it("should have many projects", async () => {
      const user = await userRepository.save({
        name: "John Doe",
        email: "john.doe@example.com",
        encryptedPassword: 'encryptedPassword'
      })

      const project = await projectRepository.save({
        name: "My first project",
        user,
      })

      expect(project.user.id).toBe(user.id)
    });
  });
});
