import { server } from "../index";
import request from "supertest";
import { v4 } from "uuid";

jest.mock("../data/data.ts", () => ({
  __esModule: true,
  default: [],
}));

describe("User API", () => {
  let userId: string;
  let newUser = {
    username: "Mike",
    age: 50,
    hobbies: [],
  };
  let wrongNewUser = {
    username: "Penelopa",
    age: "50",
  };
  let randomUserId = v4();

  beforeAll((): void => {
    server.close();
    server.listen(process.env.PORT || 3000);
  });

  afterAll(async (): Promise<void> => {
    await new Promise((resolve): void => {
      server.close(resolve);
    });
  });

  test("GET: get all records with a GET api/users request (an empty array is expected)", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("POST: A new object is created (a response containing newly created record is expected)", async () => {
    const response = await request(server).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe("Mike");
    expect(response.body.age).toBe(50);
    expect(response.body.hobbies).toEqual([]);
    userId = response.body.id;
  });

  test("GET USER BY ID: try to get the created record by its id (the created record is expected)", async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("Mike");
    expect(response.body.age).toBe(50);
    expect(response.body.hobbies).toEqual([]);
  });

  test("PUT: try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const updatedUser = { username: "Kate" };
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe("Kate");
  });

  test("DELETE: we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test("GET USER BY ID: trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("record with id === userId doesn't exist");
  });

  test("POST: server should answer with status code 400 and corresponding message if request body does not contain required fields", async () => {
    const response = await request(server)
      .post("/api/users")
      .send(wrongNewUser);

    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Body does not contain required fields or they have invalid values",
    );
  });

  test("GET USER BY ID: Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const response = await request(server).get(`/api/users/1`);
    expect(response.status).toBe(400);
    expect(response.text).toBe("userId is invalid");
  });

  test("PUT: server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const updatedUser = { username: "Kate" };
    const response = await request(server)
      .put(`/api/users/1`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(response.text).toBe("userId is invalid");
  });

  test("DELETE: server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const response = await request(server).delete(`/api/users/1`);
    expect(response.status).toBe(400);
    expect(response.text).toBe("userId is invalid");
  });

  test("GET USER BY ID: Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist", async () => {
    const response = await request(server).get(`/api/users/${randomUserId}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("record with id === userId doesn't exist");
  });

  test("PUT: server should answer with status code 404 and corresponding message if record with id === userId doesn't exist", async () => {
    const updatedUser = { username: "Kate" };
    const response = await request(server)
      .put(`/api/users/${randomUserId}`)
      .send(updatedUser);

    expect(response.status).toBe(404);
    expect(response.text).toBe("record with id === userId doesn't exist");
  });

  test("DELETE: Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist", async () => {
    const response = await request(server).delete(`/api/users/${randomUserId}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("record with id === userId doesn't exist");
  });
});
