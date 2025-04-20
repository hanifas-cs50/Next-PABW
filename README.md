# Posty - Social Media Platform

A modern social media platform built with Next.js, featuring user authentication, post creation, and admin management capabilities.

## Features

- User Authentication (Sign Up, Sign In)
- Post Creation and Management
- User Profile Viewing
- Admin Dashboard
  - User Management
  - Post Management
  - Admin Management
- Password Change Functionality
- Responsive Design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Drizzle ORM
- **Authentication**: NextAuth.js
- **Password Hashing**: bcryptjs

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- SQLite3

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd next_pabw
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   NEXTAUTH_SECRET=your_secret_key_here
   DB_FILE_NAME=./sqlite.db
   ```

4. **Database Setup**
   The application uses SQLite with Drizzle ORM. The database will be automatically created when you first run the application.

5. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## Project Structure

```
next_pabw/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── admin/             # Admin dashboard routes
│   ├── home/              # User dashboard routes
│   └── api/               # API routes
├── components/            # React components
│   ├── admin/            # Admin components
│   └── user/             # User components
├── lib/                  # Utility libraries
│   ├── auth/            # Authentication utilities
│   └── db/              # Database configuration
├── actions/             # Server actions
├── public/             # Static files
└── styles/             # Global styles
```

## Key Features Implementation

### Authentication
- Uses NextAuth.js for authentication
- Supports username/password login
- Session management
- Protected routes

### Database
- SQLite database with Drizzle ORM
- Tables:
  - users (id, username, email, password, role)
  - posts (id, content, userId, createdAt, updatedAt)

### Admin Features
- User management (view, delete)
- Post management (view, delete)
- Admin management
- Role-based access control

### User Features
- Post creation and deletion
- Profile viewing
- Password change
- User settings

## Development Guidelines

1. **Code Style**
   - Use functional components with hooks
   - Follow Next.js 14 conventions
   - Use Tailwind CSS for styling

2. **State Management**
   - Use React hooks for local state
   - Server actions for data mutations
   - Context API for global state (if needed)

3. **Security**
   - All sensitive operations are server-side
   - Password hashing with bcrypt
   - Protected API routes
   - Input validation

4. **Performance**
   - Server-side rendering where appropriate
   - Client-side rendering for interactive components
   - Optimized database queries

## Troubleshooting

1. **Database Issues**
   - Ensure SQLite is installed
   - Check database file permissions
   - Verify environment variables

2. **Authentication Issues**
   - Check NEXTAUTH_SECRET in .env
   - Verify database connection
   - Check user credentials

3. **Development Server Issues**
   - Clear node_modules and reinstall
   - Check for port conflicts
   - Verify Node.js version

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
