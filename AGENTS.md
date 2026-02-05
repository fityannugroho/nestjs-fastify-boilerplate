# 🤖 Agent Instructions for nestjs-fastify-boilerplate

This document serves as a guide for agentic coding assistants (like yourself) working on this repository. Adhere to these conventions and commands to ensure consistency and quality.

## 🚀 Project Overview
- **Framework:** NestJS (v11+) with Fastify adapter.
- **Runtime:** Node.js (>=20.0.0), ESM mode (`"type": "module"`).
- **Package Manager:** pnpm.
- **ORM:** Prisma (with PostgreSQL).
- **Tooling:** Biome (linting/formatting), Vitest (testing), SWC (compilation).

## 🛠 Essential Commands

### Development & Build
- `pnpm run build`: Type checking and compiles the project.
- `pnpm run start`: Starts the application.
- `pnpm run start:dev`: Starts the application in watch mode.
- `pnpm run start:debug`: Starts the application in debug and watch mode.

### Linting & Formatting
- `pnpm run lint`: Runs Biome check and applies safe fixes (equivalent to `biome check --write`).
- **Import Organization:** Biome is configured to automatically organize imports.

### Testing
- `pnpm test`: Runs all unit tests using Vitest in run mode.
- `pnpm run test:watch`: Runs Vitest in watch mode.
- `pnpm run test:e2e`: Runs end-to-end tests using the e2e configuration (`vitest.config.e2e.ts`).
- `pnpm run test:cov`: Generates test coverage report.
- **Single Test File:** `pnpm vitest run src/path/to/file.spec.ts`
- **Specific Test Case:** `pnpm vitest run -t "should return health status"`

### Database (Prisma)
- `pnpm run migrate`: Creates a new migration and applies it (development).
- `pnpm run migrate:reset`: Resets the database and reapplies all migrations.
- `pnpm run migrate:deploy`: Applies pending migrations (production/CI).
- `pnpm prisma generate`: Generates the Prisma client.
- `pnpm prisma studio`: Opens the Prisma GUI.

## 📂 Project Structure
- `src/`: Main source code.
  - `common/`: Shared utilities, decorators, filters, guards, and interceptors.
    - `decorator/`: Custom class-validator and NestJS decorators.
  - `prisma/`: Prisma module and service.
    - `generated/`: Location of the generated Prisma client.
  - `app.module.ts`: Root module of the application.
  - `main.ts`: Entry point of the application.
- `test/`: E2E tests and test utilities.
- `prisma/`: Prisma schema and migrations.

## 🎨 Coding Style & Conventions

### 1. File Naming
- Use `kebab-case` for all files and directories.
- **Suffixes:**
  - `*.controller.ts` for controllers.
  - `*.service.ts` for services.
  - `*.module.ts` for modules.
  - `*.dto.ts` for Data Transfer Objects.
  - `*.decorator.ts` for custom decorators.
  - `*.spec.ts` for unit tests.
  - `*.e2e-spec.ts` for E2E tests.

### 2. Strict ESM Imports
- **Important:** Since the project uses `module: NodeNext`, all local relative imports in `.ts` files MUST include the `.js` extension.
  - ✅ `import { PrismaService } from './prisma.service.js';`
  - ❌ `import { PrismaService } from './prisma.service';`
- Use `import type` for type-only imports to avoid runtime overhead and circular dependencies.
- Organize imports using Biome (automatically handled by `pnpm run lint`).

#### Example ESM Import Pattern
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js'; // Relative import with .js extension
import type { User } from './generated/client.js'; // Type-only import
```

### 3. TypeScript Guidelines
- **Strictness:** Maintain strict type safety. Avoid `any` where possible.
- **Types vs Interfaces:** Prefer `type` for simple definitions and `interface` when declaration merging is required.
- **Naming:**
  - Classes: `PascalCase` (e.g., `AuthService`).
  - Variables/Methods: `camelCase` (e.g., `findUserByEmail`).
  - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`).
- **Return Types:** Always explicitly define return types for public methods in controllers and services.

### 4. NestJS Patterns
- **Controllers:** Keep them lean. Only handle request mapping and simple response transformation.
- **Services:** Place all business logic here. Services should be injectable and scoped to their modules.
- **Modules:** Encapsulate related functionality. Use `exports` to share services with other modules.
- **Global Pipes:** `ValidationPipe` is enabled globally in `main.ts` with `whitelist: true`.

### 5. Error Handling
- Use NestJS built-in `HttpException` classes:
  - `NotFoundException`, `BadRequestException`, `ForbiddenException`, etc.
- Throw exceptions as early as possible in the service layer.
- Ensure error messages are descriptive and helpful for the API consumer.

### 6. Validation & DTOs
- Use `class-validator` decorators on DTO classes.
- Use `class-transformer` for any necessary data transformation before validation.
- Custom validation decorators should be placed in `src/common/decorator/`.

#### Example Custom Decorator Usage
```typescript
import { IsString } from 'class-validator';
import { EqualsAny } from '../common/decorator/equals-any.decorator.js';

export class UpdateUserDto {
  @IsString()
  @EqualsAny(['active', 'inactive'])
  status: string;
}
```

### 7. Database & Prisma
- Inject `PrismaService` for all database interactions.
- The Prisma client is generated in `src/prisma/generated`.
- Handle database constraints by catching Prisma errors and throwing appropriate NestJS exceptions.
- Models should be defined in `prisma/schema.prisma`.

### 8. Testing Conventions
- Use `vitest` for all tests.
- Mock external dependencies and services using NestJS `TestingModule`.
- Prefer descriptive test names: `it('should return 404 when user is not found', ...)`

## 🤖 Agent Workflow Rules

1. **Verify Before Finish:** Always run `pnpm run lint` and `pnpm run build` before considering a task complete.
1. **Test New Logic:** If adding a new feature, include a corresponding `*.spec.ts` file.
1. **Respect Biome:** Do not ignore Biome warnings unless absolutely necessary.
1. **Environment:** Use `process.env` for configuration, but ensure keys are documented in `.env.example`.
1. **ESM Compliance:** Double-check that all new imports have the `.js` extension.
1. **Prisma Schema:** If you modify `schema.prisma`, remember to run `pnpm prisma generate`.
1. **Dependencies:** Use `pnpm` for all package management. Avoid `npm` or `yarn`.
1. **Git Commits:** Follow the project's commit message style (usually conventional commits).
1. **Proactiveness:** If you notice a small improvement (e.g., missing type, minor lint fix), apply it.
