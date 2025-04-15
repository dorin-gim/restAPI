# REST API Project

A simple RESTful API built with Node.js and Express.js, designed to demonstrate basic CRUD operations and middleware integration.

## Project Description

The REST API Project is a foundational backend application built with Node.js and Express.js, showcasing how to implement a basic RESTful API. The project demonstrates key backend concepts such as route handling, middleware integration, request validation, and modular architecture. It provides full CRUD (Create, Read, Update, Delete) operations on a sample data model, making it ideal for beginners to learn REST principles and for developers to use as a boilerplate for future backend services.

This project is structured for scalability and clarity, using industry-standard practices. With input validation powered by Joi and routes separated for maintainability, the API is designed to be both robust and easy to understand.

## Features

- CRUD operations for managing resources
- Structured routing using Express Router
- Middleware integration for request handling
- Input validation with Joi
- Modular codebase for scalability

## Technologies Used

- Node.js
- Express.js
- Joi (for input validation)
- JavaScript

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dorin-gim/restAPI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd restAPI
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### GET /api/items

Retrieve a list of all items.

### GET /api/items/:id

Retrieve a specific item by ID.

### POST /api/items

Create a new item.

- Request Body:

  ```json
  {
    "name": "Item Name",
    "description": "Item Description"
  }
  ```

### PUT /api/items/:id

Update an existing item by ID.

- Request Body:

  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description"
  }
  ```

### DELETE /api/items/:id

Delete an item by ID.

## Project Structure

```
restAPI/
├── index.js
├── package.json
├── routes/
│   └── items.js
├── models/
│   └── item.js
├── middlewares/
│   └── validate.js
└── node_modules/
```

- `index.js`: Entry point of the application.
- `routes/`: Contains route definitions.
- `models/`: Defines data models.
- `middlewares/`: Custom middleware functions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
