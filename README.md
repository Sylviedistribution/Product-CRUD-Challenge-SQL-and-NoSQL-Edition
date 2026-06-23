# Product CRUD Challenge – SQL and NoSQL Edition

## Overview

This project demonstrates the implementation of CRUD (Create, Read, Update, Delete) operations using both MongoDB (NoSQL) and MySQL (SQL) in a Node.js environment.

The goal is to compare how the same business logic can be implemented with two different database systems while maintaining consistent API behavior.

---

## Features

### MongoDB (Mongoose)

* Create a product
* Get all products
* Get a product by ID
* Update a product
* Delete a product

### MySQL (mysql2)

* Create a product
* Get all products
* Get a product by ID
* Update a product
* Delete a product

---

## Product Structure

Each product contains the following fields:

| Field    | Type           | Required           |
| -------- | -------------- | ------------------ |
| id       | Auto-generated | Yes                |
| name     | String         | Yes                |
| price    | Number         | Yes                |
| category | String         | No                 |
| inStock  | Boolean        | No (default: true) |

---

## Technologies Used

### Backend

* Node.js
* Express.js

### NoSQL Database

* MongoDB
* Mongoose

### SQL Database

* MySQL
* mysql2

### Environment Variables

* dotenv

### Error Handling

* Custom AppError class
* catchAsync utility

---

## Installed Dependencies

### Production Dependencies

Install the required packages:

```bash
npm install express mongoose mysql2 dotenv
```

### Development Dependencies

```bash
npm install --save-dev nodemon
```

---

## Project Structure

```text
project-root/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── mongoProductController.js
│   └── sqlProductController.js
│
├── models/
│   └── productModel.js
│
├── routes/
│   ├── mongoProductRoutes.js
│   └── sqlProductRoutes.js
│
├── utils/
│   ├── appError.js
│   └── catchAsync.js
│
├── migrations/
│   └── create_products_table.sql
│
├── .env
├── server.js
└── package.json
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/productdb

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=sqlcrud
```

---

## Database Setup

### MongoDB

Start MongoDB locally or use MongoDB Atlas.

Example connection:

```env
MONGO_URI=mongodb://localhost:27017/productdb
```

---

### MySQL

Create a database:

```sql
CREATE DATABASE sqlcrud;
```

Execute the migration:

```sql
CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) DEFAULT NULL,
  inStock TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

---

## Running the Project

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## API Endpoints

### MongoDB Routes

Base URL:

```text
/api/mongo/products
```

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | /        | Create product    |
| GET    | /        | Get all products  |
| GET    | /:id     | Get product by ID |
| PUT    | /:id     | Update product    |
| DELETE | /:id     | Delete product    |

---

### MySQL Routes

Base URL:

```text
/api/sql/products
```

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | /        | Create product    |
| GET    | /        | Get all products  |
| GET    | /:id     | Get product by ID |
| PUT    | /:id     | Update product    |
| DELETE | /:id     | Delete product    |

---

## Learning Objectives

This project demonstrates:

* CRUD operations with MongoDB and MySQL
* Mongoose schema creation
* SQL table creation and migrations
* Parameterized SQL queries
* Express routing
* Error handling in Node.js
* Differences between SQL and NoSQL databases

---

## Author

Developed as part of the GoMyCode Backend Development Program.
