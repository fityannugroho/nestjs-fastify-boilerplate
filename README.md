# NestJS Fastify Boilerplate

A modern NestJS boilerplate using Fastify as the HTTP server with Prisma ORM for database management.

## Features

- Fastify - High-performance HTTP server
- Prisma ORM - Type-safe database access
- Vitest - Fast testing framework
- TypeScript - Full type safety
- Biome - Fast linting and formatting

## Getting Started

### Prerequisites

- Node.js (v20+)
- PostgreSQL database
- pnpm

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   # Update DATABASE_URL with your PostgreSQL connection string
   ```

3. **Setup database**
   ```bash
   pnpm prisma generate
   pnpm migrate
   ```

4. **Start development server**
   ```bash
   pnpm start:dev
   ```

Visit `http://localhost:3000` to see your application running.
