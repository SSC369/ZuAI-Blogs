# ZUAI Blogs

## APPLICATION DEMO

https://drive.google.com/file/d/1PZeaxSXY5rYCOsLxGnnMnskJ6pa7Uw08/view?usp=sharing

## HOSTED LINK

https://zuai-blogs-48b62c.netlify.app

ZUAI Blogs is a basic blog application that features a list view and a detail view for blog posts. This project demonstrates full-stack development, including frontend, backend, database management, and deployment.

## Project Overview

### Features

- List view of blog posts with titles and description , image
- Detail view for individual blog posts
- Form for adding new blog posts with client-side validation
- Responsive layout with a header, main content area, and footer

### Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Render, Fly.io, or Heroku
- **Authentication**: JWT
- **Firebase**: For frontend configuration

## Backend

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/zuai-blogs.git
   cd zuai-blogs
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   MONGODB_CONNECTION_LINK=your_mongodb_connection_link
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### API Endpoints

- `GET /posts` - List all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

## Frontend

This is the frontend part of the ZUAI Blogs application, built using React and Vite. The application features a responsive layout for viewing, creating, and editing blog posts. It also includes user authentication and a comment system.

## Features

- **Login and Register Pages**: For user authentication.
- **Home Page**: Displays a list of blog posts.
- **Blog Page**: Displays individual blog posts with options to edit, delete, and comment.
- **Create Blog Page**: Allows users to create new blog posts.
- **Edit Blog Page**: Allows users to edit existing blog posts.
- **Comments Modal**: View and add comments to blog posts.

## Setup

### Prerequisites

Ensure you have Node.js and npm installed. If not, download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/zuai-blogs.git
   cd zuai-blogs/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory with the following environment variables:
   ```env
   VITE_BACKEND_URL=https://your-backend-url.com
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Project Structure

- **`src/pages/`**: Contains the main pages of the application (`Login`, `Register`, `Home`, `Blog`, `CreateBlog`, `EditBlog`).
- **`src/components/`**: Contains reusable components (`Navbar`, `Footer`, `Loader`).
- **`src/assets/`**: Contains static assets like images.

## Components Overview

### `App.js`

- **Routes**: Defines the routes for the application and includes protected routes that require authentication.
- **ProtectedRoute**: A higher-order component that checks for authentication before rendering protected pages.

### `Blog.js`

- **Functionality**: Handles the display of individual blog posts, including fetching post data, handling comments, and managing edit/delete actions.
- **Modal**: Displays comments in a modal with options to add and delete comments.

## Deployment

For deployment, you can use Vercel, Netlify, or any other cloud service that supports static sites. Ensure that the environment variables are correctly configured in the deployment settings.

## Bonus Features

- **User Authentication**: Implemented with JWT.
- **Comments System**: Users can view, add, and delete comments on blog posts.
- **Responsive Design**: Ensures the application works well on different screen sizes.
