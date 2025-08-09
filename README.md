# Quizmaster

A quiz taking app that serves as a case study during
[Applying Professional Scrum for Software Development](https://scrumdojo.cz/aps-sd)
training with [ScrumDojo.cz](https://scrumdojo.cz).

## Tech Stack

Prior to the class ge yourself familiar with the tech stack:

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Gradle](https://gradle.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Flyway](https://flywaydb.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Cucumber.js](https://cucumber.io/docs/guides/)
- [Playwright](https://playwright.dev/)

## Getting started

1. **Create your development environment**. You have three options:

    - [GitHub Codespaces](docs/dev-environment/dev-env-codespaces.md) ⭐ recommended
    - [Local Docker/Podman container](docs/dev-environment/dev-env-podman.md)
    - [Local Environment](docs/dev-environment/dev-env-local.md)

    See more for [comparison](docs/dev-environment/dev-env-comparison.md).

    > Apple Silicon / arm64 note: This repo includes a ready-to-use dev container for Apple Silicon. In VS Code/Cursor choose “Dev Containers: Reopen in Container” and select “QuizMaster (Apple Silicon / arm64 Dev Container)”. It will build/pull everything needed (Java 21, Node 22 + pnpm, PostgreSQL 16, Playwright deps) and start the DB automatically. No extra setup on your Mac is required except having Docker Desktop installed.

2. **Setup your IDE**

    - Setup [IntelliJ IDEA](docs/dev-environment/setup-intellij.md)
    - Setup [VS Code](docs/dev-environment/setup-vscode.md)

3. [How to run & develop Quizmaster](docs/dev-environment/how-to-develop.md)
