# Event Manager

Event Manager is a full-stack application designed to manage events such as conferences, concerts, parties, and more. It allows users to create, view, and manage events.

## Features

- Event creation
- Event listing
- Backend built with Node.js and Express
- Frontend built with React
- MongoDB for data management
- Optional user authentication (can be added later)

## Project Structure

event-manager/
│
├── server/                    # Backend with Node.js + Express
│   ├── controllers/            # Server logic handlers
│   │   └── eventController.js  # Handles event-related logic
│   ├── models/                 # Mongoose models for MongoDB
│   │   └── Event.js            # Model for events
│   ├── routes/                 # API routes
│   │   └── eventRoutes.js      # Event API routes
│   └── server.js               # Server entry point, connects everything
│
└── client/                    # Frontend with React
    ├── src/
    │   ├── components/         # React components
    │   │   ├── EventList.js    # Component to list events
    │   │   └── EventForm.js    # Component to create events
    │   └── App.js              # Main React component, starting point
    └── package.json            # Frontend dependencies and configurations



## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/event-manager.git
cd event-manager

    Backend:
        Navigate to the server folder.
        Install the dependencies:

npm install

    Start the server:

node server.js

Frontend:

    Navigate to the client folder.
    Install the dependencies:

npm install

    Start the React app:

    npm start

API Endpoints

    GET /events: Retrieves all events.
    POST /events: Creates a new event (requires name, description, date, and location in the request body).

Contributing

If you'd like to contribute, feel free to open a "pull request" with a clear description of the changes you've made. By following this guide, we can keep the project organized and functional.
License

This project is licensed under the MIT License - see the LICENSE file for details.
