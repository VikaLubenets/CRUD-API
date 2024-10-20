const mockData = [
    {   
        id: 'c2071063-fad9-4506-86b6-4cfb7349df15',
        username: 'Mike', 
        age: 50, 
        hobbies: []
    },
    {
        id: "13b1cdf7-a6d2-4eda-872c-20e6d22d4e99",
        username: 'Olga', 
        age: 25, 
        hobbies: ['swimming']
    },
    {
        id: "0f5e9de3-a373-4fce-9646-7cdd39f4a582",
        username: 'Lika', 
        age: 30, 
        hobbies: ['makeup']
    },
];

import { server } from '../index';
import request from "supertest";

jest.mock('../data/data.ts', () => ({
  __esModule: true,
  default: mockData,
}));

describe("Second scenario testing API", () => {
  let userId: string;
  let newUser = {
    username: 'Penelopa', 
    age: '50', 
  }

  afterAll(() => {
    server.close();
  });

  test("Get all records with a GET api/users request", async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("Server should answer with status code 400 and corresponding message if request body does not contain required fields", async () => {
    const response = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Body does not contain required fields or they have invalid values');
  });

  test("Get user by id: Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const response = await request(server).get(`/api/users/1`);
    expect(response.status).toBe(400);
    expect(response.text).toBe('userId is invalid');
  });

  test("Update user: server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const updatedUser = { username: 'Kate' };
    const response = await request(server)
      .put(`/api/users/1`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(response.text).toBe('userId is invalid');
  });

  test("Delete user: server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const response = await request(server).delete(`/api/users/1`);
    expect(response.status).toBe(400);
    expect(response.text).toBe('userId is invalid');
  });

});
