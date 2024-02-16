# StayEase

StayEase is a community-based online platform for listing and renting local homes. It connects hosts and travelers and facilitates the process of renting without owning any rooms itself. Moreover it cultivates a sharing-economy by allowing property owners to rent out private flats.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#endpoints)


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


## Endpoints

### Frontend

- **GET /**: HomePage
- **GET /houses**: Render all houses/rooms (index)
- **GET /houses/new**: Render a form to list house/rooms
- **GET /houses/:id**: Render specific house by its ID
- **GET /houses/:id/edit**: Render a form to edit house/rooms
  
<img width="1440" alt="Screenshot 2024-02-16 at 3 15 26 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/de56aa44-813f-4586-9000-30b0fa22e5d5">

<img width="1438" alt="Screenshot 2024-02-16 at 3 43 47 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/09db4548-8130-49f9-b44f-a0913f7af9ff">

<img width="1438" alt="Screenshot 2024-02-16 at 3 32 37 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/355526d3-f68f-4987-83a7-ae29198717ca">

<img width="1439" alt="Screenshot 2024-02-16 at 3 34 16 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/b584e5ed-5b03-401b-9075-2504092d6aa4">

<img width="1439" alt="Screenshot 2024-02-16 at 3 35 12 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/5ffac645-18d3-4977-9d9a-74b689a8931f">

<img width="1437" alt="Screenshot 2024-02-16 at 3 35 25 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/057e2cfc-0969-42dd-a0df-f58b4e4dc394">

<img width="1437" alt="Screenshot 2024-02-16 at 3 38 38 PM" src="https://github.com/sachinSingh53/StayEase/assets/96944676/5cc03c28-d57b-4117-ba5a-b31b7d6f52d3">


 ### Backend

- **POST /houses**: Create(list) a new house/rooms
- **PUT /houses/:id**: Update a house/rooms
- **DELETE /houses/:id**: Delete a specific house by its ID
- **POST /findbylocation/search**: Search nearby houses/rooms


