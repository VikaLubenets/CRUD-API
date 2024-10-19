# My CRUD API Project

This is a simple CRUD (Create, Read, Update, Delete) API for managing user records. It supports basic operations such as fetching, creating, updating, and deleting users. Below are the detailed instructions for installing, running, and using the application.

## Table of Contents
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [API Endpoints](#api-endpoints)
4. [Testing with Postman](#testing-with-postman)

## Installation

To set up and run the application locally, follow these steps:

1. **Clone the repository** (if using version control):
   ```bash
   git clone https://github.com/VikaLubenets/CRUD-API.git
2. **Navigate to the project directory:**

   ```bash
    cd CRUD-API
3. **Install dependencies:**
   ```bash
    npm install

## Running the Application:

### Development Mode

To run the application in development mode, use the following command:

    npm run start:dev
    
The server will be available at http://localhost:3000 or another port if you create .env file with PORT.

### Production Mode

To run the application in production mode, build it first and then start the server:

    npm run start:prod

The server will be available at http://localhost:3000 or another port if you create .env file with PORT.

## API Endpoints

The API provides the following endpoints for managing user records:

1. **GET** `/api/users`  
   **Description**: Retrieve all users.  
   **Response**:  
   - **Status Code**: `200` - Returns all user records.

2. **GET** `/api/users/{userId}`  
   **Description**: Retrieve a user by their `userId`.  
   **Response**:  
   - **Status Code**: `200` - Returns the user record if it exists.  
   - **Status Code**: `400` - Returns an error if `userId` is invalid (not a valid UUID).  
   - **Status Code**: `404` - Returns an error if no user with the given `userId` is found.

3. **POST** `/api/users`  
   **Description**: Create a new user record.  
   **Request Body**: Should contain required fields like `username`, `age`, and `hobbies`.  
   **Response**:  
   - **Status Code**: `201` - Returns the newly created user record.  
   - **Status Code**: `400` - Returns an error if the request body is missing required fields.

4. **PUT** `/api/users/{userId}`  
   **Description**: Update an existing user.  
   **Request Body**: Can contain any of the user fields (`username`, `age`, `hobbies`) for updating.  
   **Notes**:  
   - The `age` field can be passed as a string; the server will parse it into a number. If the value is not a valid number, an error will be returned.  
   **Response**:  
   - **Status Code**: `200` - Returns the updated user record.  
   - **Status Code**: `400` - Returns an error if `userId` is invalid (not a valid UUID).  
   - **Status Code**: `404` - Returns an error if no user with the given `userId` is found.

5. **DELETE** `/api/users/{userId}`  
   **Description**: Delete an existing user from the database.  
   **Response**:  
   - **Status Code**: `204` - User record was found and deleted successfully.  
   - **Status Code**: `400` - Returns an error if `userId` is invalid (not a valid UUID).  
   - **Status Code**: `404` - Returns an error if no user with the given `userId` is found.


## Testing with Postman

To test the API, you can use Postman. Below are examples of how to test each endpoint:

1. **GET all users**  
   **Method**: GET  
   **URL**: `http://localhost:3000/api/users`

2. **GET a user by ID**  
   **Method**: GET  
   **URL**: `http://localhost:3000/api/users/{userId}`  
   Replace `{userId}` with a valid UUID.

3. **POST a new user**  
   **Method**: POST  
   **URL**: `http://localhost:3000/api/users`  
   **Body (JSON)**:
   ```json
   {
     "username": "John",
     "age": "30",
     "hobbies": ["reading", "gaming"]
   }

4. **PUT to update a user**  
   **Method**: PUT  
   **URL**: `http://localhost:3000/api/users/{userId}`  
   Replace `{userId}` with a valid UUID.  
   **Body (JSON)**:
   ```json
   {
     "age": "35",
     "hobbies": ["swimming"]
   }

   This request can include any user field (username, age, hobbies) that you want to update. The age field can be passed as a number or as a string, and the server will parse it into a number. If it is not a valid number, an error will be returned.

5. **DELETE a user by ID**  
   **Method**: DELETE  
   **URL**: `http://localhost:3000/api/users/{userId}`  
   Replace `{userId}` with a valid UUID.


**Note:** Ensure the server is running (localhost:3000) while making requests through Postman.

**Additional Information**
1. UUID Validation: The API validates the UUID format for user IDs in routes that require it.
2. Data Type Validation: The age field can be passed as a string; it will be parsed to a number. If parsing fails, an error message will be returned.






