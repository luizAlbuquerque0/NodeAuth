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
- Refresh Token with **Rotation** mechanism
  - New refresh token is issued on every use
  - Old refresh tokens are invalidated immediately after use
  - Mitigates token theft and replay attacks
- Role-Based Access Control (RBAC)
  - Define roles (e.g. user, admin)
  - Protect routes based on user role
- Pluggable architecture with adapters
- Ready to extend with OAuth, password resets, and more

## 🔁 Refresh Token Rotation

Refresh Token Rotation increases security by ensuring that each refresh token is valid for only **one use**. Every time the client uses a refresh token to get a new access token:

1. The server verifies and **invalidates the current refresh token**.
2. A **new refresh token** is generated and sent to the client.
3. If a stolen refresh token is reused, it will already be invalid, preventing replay attacks.

This pattern is particularly effective against scenarios where refresh tokens might be leaked or stolen.

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
git clone https://github.com/luizAlbuquerque0/NodeAuth.git

# Install dependencies
cd NodeAuth
npm install

# Run the development server
npm run dev
```
