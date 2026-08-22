# Spec-Development-Component

Reusable components and project skeletons for specification-driven development.

## Available Components

- [Nest server skeleton](nest-server-skeleton/): a reusable NestJS starting point for server-side development.
- [React client skeleton](react-client-skeleton/): a reusable React, TypeScript, and Vite starting point for client-side development.

## Development Standards

Shared rules live in [rules/](rules/) and apply to every component in this repository.

- [Elegance & coding standards](rules/coding-standards.md): pyramid ordering, declarative and self-explaining code, and the refactoring patterns favored across the codebase.
- [Development workflow standards](rules/development-workflow-standards.md): the flow from a board task to a merge request — move the task to active, branch from `dev`, implement, attach proof, then open and link the merge request.
- [Close the feedback loop](rules/feedback-loops.md): how to verify work with real evidence — cURL for endpoints, unit tests for generic functions, component tests for complex server logic.
- [Migrations standards](rules/migrations-standards.md): when a schema or environment change requires a migration, and how to name and document it in the `migrations` folder.
