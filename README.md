# 🔐 Decoupled Authentication System (Node.js)

This project is a minimal and fully decoupled authentication system built with Node.js, designed as a learning tool to understand authentication concepts without being locked into any specific web framework.

## 🧱 Architecture

- **Framework-agnostic core**: The authentication logic is completely separated from the web framework, allowing you to plug it into Express, Fastify, Koa, or any other Node.js HTTP server.
- **Express adapter included**: The current implementation uses Express as an example, but it can be easily replaced thanks to the decoupled architecture.
- **Modular design**: Follows clean code and separation of concerns principles — core logic, adapters, and infrastructure are all separated.

## 📚 Goals

- Learn and practice how authentication works under the hood.
- Understand how to structure a Node.js project for flexibility and scalability.
- Enable swapping frameworks without rewriting core business logic.

## 🔧 Features

- Basic user authentication (register/login)
- JWT-based session handling
- Role-Based Access Control (RBAC)
  - Define roles (e.g. user, admin)
  - Protect routes based on user role
- Pluggable architecture with adapters
- Ready to extend with OAuth, password resets, and more

## 🔐 RBAC Overview

The system includes role-based access control (RBAC) to restrict access to certain routes based on user roles. Example usage:

```ts
// Middleware usage example
router.get(
  "/admin/dashboard",
  authenticate,
  authorize(["admin"]),
  (req, res) => {
    res.send("Welcome, admin!");
  }
);
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo-name.git

# Install dependencies
cd your-repo-name
npm install

# Run the development server
npm run dev
```
