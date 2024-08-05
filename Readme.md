# Trek Planner

Trek Planner is a fullstack application that allows users to create, manage, and share travel itineraries. With Trek Planner, users can easily plan their trips, collaborate with others, and keep track of their adventures.

## Features

- User authentication (login/logout)
- CRUD operations for itineraries
- Review and rate itineraries
- Share itineraries with other users via email
- Search and Filter itineraries

## Technologies

- Frontend: Vanilla Typescript
- Backend: Node.js with Express.js
- Database: PostgreSQL

## Installation

To run Trek Planner locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setting up the Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/trek-planner.git

   ```

2. Navigate to frontend directory
   ```bash
   cd goreto/frontend
   npm i
   npm run dev
   ```

The frontend should now be running on http://localhost:5173

### Setting up the backend

1. Open a new terminal window and navigate to the backend directory:
   ```bash
   cd goreto/backend
   npm i
   npm run migrate
   npm start
   ```
