# E-Commerce Backend

This project is a simple Node.js and MongoDB application for E-Commerce. It provides API endpoints for creating, updating, searching, and deleting products and their variants.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features

- CRUD operations for products and variants
- Search functionality for products and variants
- MongoDB database integration
- Express.js for handling API requests
- Jest and Supertest for testing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm or yarn installed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sachinSingh53/E-Commerce.git
   
   
2. Install dependencies:

   ```bash
   npm install

## Usage

1. Start the server:

   ```bash
   npm start
The server will be running at http://localhost:3000.

2. Use API endpoints to interact with the application.


## API Endpoints

### Products

- **GET /products**: Get all products
- **POST /products**: Create a new product
- **GET /products/:id**: Get a specific product by ID
- **PUT /products/:id**: Update a product by ID
- **DELETE /products/:id**: Delete a product by ID
- **GET /products/search**: Search for products

### Variants

- **POST /products/:id/variant**: Create a new variant for a specific product
- **PUT /variants/:varId**: Update a variant by ID
- **DELETE /variants/:varId**: Delete a variant by ID

## Architecture
![Untitled Diagram drawio](https://github.com/sachinSingh53/mirror_backend_task/assets/96944676/f908020c-a93a-4b0b-9919-15f8a0685f1f)


## Testing

Run tests using Jest:

```bash
npm test
