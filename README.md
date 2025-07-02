# BINcA Website

A modern high school website built with Node.js and Express.js, designed as a personal project to showcase school information and features.

## Features

- File upload functionality for school content
- RESTful API endpoints
- MongoDB integration for data storage
- Modern JavaScript with Babel
- Development environment with hot-reloading

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Babel (for modern JavaScript support)
- Multer (for file uploads)
- CORS support

## Installation and Setup

### Prerequisites

1. Install Node.js
   - Visit [Node.js website](https://nodejs.org/) and download the LTS version
   - Run the installer and follow the installation steps
   - Verify installation by running `node --version` in your terminal

2. Install MongoDB
   - Visit [MongoDB website](https://www.mongodb.com/try/download/community)
   - Download and install MongoDB Community Server
   - Start the MongoDB service
   - Verify installation by running `mongod --version` in your terminal

### Project Setup

1. Clone the repository
```bash
git clone https://github.com/xAlexBFx/BINcA-Website.git
```

2. Navigate to the project directory
```bash
cd BINcA-Website
```

3. Install project dependencies
```bash
npm install
```

4. Set up environment variables
   - Create a `.env` file in the root directory
   - Add the following configuration:
```
MONGODB_URI=mongodb://localhost:27017/binca
PORT=3000
```
   - Replace `mongodb://localhost:27017/binca` with your MongoDB connection string if needed

### Running the Application

1. Development mode
   - Start the development server with hot-reloading:
```bash
npm run dev
```
   - The application will be available at `http://localhost:3000`
   - Changes to the code will automatically reload the server

2. Production mode
   - Build the production version:
```bash
npm run build
```
   - Start the production server:
```bash
npm start
```

## API Documentation

### Base URL
`http://localhost:3000`

### Available Endpoints

- `POST /api/upload` - Upload files (for school content)

## Project Structure

```
BINcA-Website/
├── src/
│   ├── controllers/     # API controllers
│   ├── models/          # Database models
│   ├── public/          # Static files
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── database.js      # Database configuration
├── package.json         # Project dependencies
└── .env                # Environment variables
```

## Author

Alex Betances
