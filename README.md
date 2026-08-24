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

## Skills

On-demand workflows live in [skills/](skills/).

- [Plan task](skills/plan-task.md): turn a referenced Trello card into a reviewable implementation plan. Resolves the card against the [Team's Goals](https://trello.com/b/0YGKf1tR/teams-goals) board, reads its description, checklists, comments and attachments, pulls any linked Figma designs, studies the codebase, then writes the plan. Implementation happens only when you ask for it.

## Using These Standards With AI Agents

The rules are published in two formats so each toolchain picks them up on its own.

- **Claude** — [CLAUDE.md](CLAUDE.md) consolidates every file in [rules/](rules/) into one document that Claude Code loads as project-wide guidance. Drop it at the root of any repository that should follow these standards.
- **GitHub Copilot** — copy each rule to `.github/instructions/<name>.instructions.md` with `applyTo` frontmatter, and each skill to `.github/skills/<name>/SKILL.md` with a `name` and `description`. Copilot only auto-loads those paths, so a plain copy of `rules/` or `skills/` is silently ignored.

[rules/](rules/) is the source of truth; `CLAUDE.md` and any `.github/` copies are derived from it and must be regenerated when a rule changes.
