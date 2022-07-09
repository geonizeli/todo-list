import { RedisConnection } from "../../infra/redis";
import { sessionRepository } from "../session.repository";
import { v4 as uuid } from "uuid";
describe("sessionRepository", () => {
  beforeAll(async () => {
    await RedisConnection.connect();
  });
  afterAll(async () => {
    await RedisConnection.disconnect();
  });

  describe("saveSession", () => {
    it("should save a new session on redis", async () => {
      const sessionToken = uuid();

      expect(await sessionRepository.saveSession(sessionToken)).toBeTruthy();
      expect(await sessionRepository.sessionExists(sessionToken)).toBeTruthy();
    });
  });
  describe("sessionExists", () => {
    it("should return true if session exists", async () => {
      const sessionToken = uuid();

      expect(await sessionRepository.saveSession(sessionToken)).toBeTruthy();
      expect(await sessionRepository.sessionExists(sessionToken)).toBeTruthy();
    });

    it("should return false if session does not exists", async () => {
      const sessionToken = uuid();
      expect(await sessionRepository.sessionExists(sessionToken)).toBeFalsy();
    });
  });
  describe("deleteByToken", () => {
    it("should remove session from redis", async () => {
      const sessionToken = uuid();

      await sessionRepository.saveSession(sessionToken);
      expect(await sessionRepository.deleteSession(sessionToken)).toBeTruthy();
      expect(await sessionRepository.sessionExists(sessionToken)).toBeFalsy();
    });
  });
});
