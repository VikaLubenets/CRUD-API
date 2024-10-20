import { server } from '../index';
import request from "supertest";

jest.mock('../data/data.ts', () => ({
  __esModule: true,
  default: [],
}));

describe("First scenario testing API", () => {
  let userId: string;
  let newUser = {
    username: 'Mike', 
    age: 50, 
    hobbies: []
  }

  afterAll(() => {
    server.close();
  });

  test("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const response = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('Mike');
    expect(response.body.age).toBe(50);
    expect(response.body.hobbies).toEqual([]);
    userId = response.body.id;
  });

  test("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('Mike');
    expect(response.body.age).toBe(50);
    expect(response.body.hobbies).toEqual([]);
  });

  test("We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const updatedUser = { username: 'Kate' };
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe('Kate');
  });

  test("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test("With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("record with id === userId doesn't exist");
  });
});

