Quick Jot - A MERN Stack Note-Taking App 📝
Quick Jot is a feature-complete, full-stack web application that allows users to securely register, log in, and manage their personal notes. This project serves as a practical demonstration of building a modern web application using the MERN stack, with a focus on a clean architecture, secure authentication, and efficient state management.

## Key Features
Full User Authentication: Secure user registration and login system using JSON Web Tokens (JWT) for session management.

Protected Routes: Backend API routes are protected to ensure that only authenticated users can access their own data.

Complete CRUD Functionality: Users can Create, Read, Update, and Delete (CRUD) their notes.

State Management with Redux: The frontend utilizes Redux Toolkit to manage global state for user authentication and notes, providing a predictable and scalable state container.

Interactive UI: A responsive and interactive user interface built with React, featuring modals for viewing notes and an in-place editing system.

Monorepo Structure: The project is organized in a monorepo, containing both the frontend and backend code in a single, manageable repository.

## Tech Stack
Frontend:

React

React Router for client-side routing

Redux Toolkit for global state management

Axios for making API requests

Vite as the build tool

Backend:

Node.js as the runtime environment

Express.js as the web server framework

MongoDB with Mongoose as the NoSQL database and ODM

JSON Web Token (JWT) for authentication

bcryptjs for password hashing

## Getting Started
To run this project locally:

Clone the repository:

Bash

git clone https://github.com/your-username/quick-jot-app.git
cd quick-jot-app
Setup Backend:

Bash

cd quick-jot-backend
npm install
# Create a .env file with your MONGO_URI and JWT_SECRET
npm run dev
Setup Frontend (in a new terminal):

Bash

cd quick-jot-frontend
npm install
npm run dev
