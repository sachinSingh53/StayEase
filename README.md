# StayEase

StayEase is a community-based online platform for listing and renting local homes. It connects hosts and travelers and facilitates the process of renting without owning any rooms itself. Moreover it cultivates a sharing-economy by allowing property owners to rent out private flats.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features
- **User Authentication:** Secure sign-up and login system for both hosts and guests.
- **Accommodation Listings:** Hosts can create listings for their properties, including details like location, amenities, and pricing.
- **Search nearBy houses:** Guests can search for available accommodations, book stays, and manage their reservations.
- **Reviews and Ratings:** Guests can leave reviews and ratings for accommodations, helping future guests make informed decisions.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker installed
- npm or yarn installed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sachinSingh53/E-Commerce.git
   
   
2. Build the Image and run the container:

   ```bash
   docker-compose -f docker.compose.yml -f docker.compose.dev.yml up -d --build

## Usage


1. The server will be running at http://localhost:3000

2. Use API endpoints to interact with the application.


## API Endpoints

### Products

- **GET /**: to render the homepage
- **POST /products**: Create a new product
- **GET /products/:id**: Get a specific product by ID
- **PUT /products/:id**: Update a product by ID
- **DELETE /products/:id**: Delete a product by ID
- **GET /products/search**: Search for products

## Architecture
![Untitled Diagram drawio](https://github.com/sachinSingh53/mirror_backend_task/assets/96944676/f908020c-a93a-4b0b-9919-15f8a0685f1f)


## Testing

Run tests using Jest:

```bash
npm test
