import { v4 } from 'uuid';

const users = [
    {
        "id": "1",
        "username": "Frank",
        "age": 53,
        "hobbies": ["dancing", "cycling"]
    },
    {
        "id": "2",
        "username": "Alice",
        "age": 35,
        "hobbies": []
    },
    {
        "id": "3",
        "username": "Frank",
        "age": 57,
        "hobbies": ["swimming"]
    },
    {
        "id": "4",
        "username": "Grace",
        "age": 35,
        "hobbies": ["photography", "painting", "coding"]
    },
    {
        "id": "5",
        "username": "Grace",
        "age": 46,
        "hobbies": []
    },
    {
        "id": "6",
        "username": "Hank",
        "age": 29,
        "hobbies": []
    },
    {
        "id": "7",
        "username": "Alice",
        "age": 42,
        "hobbies": ["painting"]
    },
    {
        "id": "8",
        "username": "Jack",
        "age": 34,
        "hobbies": []
    },
    {
        "id": "9",
        "username": "Ivy",
        "age": 59,
        "hobbies": []
    },
    {
        "id": "10",
        "username": "Grace",
        "age": 37,
        "hobbies": ["coding", "photography"]
    }
];

const usersUUID = users.map(user => ({
    ...user,
    id: v4()
}));

export default usersUUID;
