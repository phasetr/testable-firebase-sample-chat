import {afterAll, afterEach, beforeAll, describe} from "vitest";
import {getTestEnv, initializeTestEnvironment} from "./utils";
import {usersTest} from "./collections/user";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
describe("firestore.rules", () => {
  beforeAll(async () => {
    await initializeTestEnvironment();
  });
  afterAll(async () => {
    await getTestEnv().cleanup();
  });
  afterEach(async () => {
    await getTestEnv().clearFirestore();
  });

  usersTest();
})