# 🖥️ Development Environment

You have multiple options to prepare your development environment:

1. [GitHub Codespaces](dev-env-codespaces.md) (recommended)\
Prepared and self-contained dev environment in a GitHub Codespaces instance.

    - The most convenient, works out-of-box. All you need is a browser or VS Code.
    - To connect from Cursor or IntelliJ IDEA requires setting up SSH access.

2. [Docker/Podman container](dev-env-podman) \
Prepared and self-contained dev environment in a local Docker/Podman container.

    - Requires local Docker/Podman installation (plus WSL2 on Windows).
    - Requires auth to GitHub from within the container.
    - People with macOS reported issues when working in IntelliJ.
    - Apple Silicon / arm64: Prefer opening the repo directly in the included dev container “QuizMaster (Apple Silicon / arm64 Dev Container)” via VS Code/Cursor → Dev Containers: Reopen in Container. This sets up Java, Node+pnpm, PostgreSQL and Playwright automatically.

3. [Local environment](dev-env-local.md) \
Run everything locally, like in the good ol' days. You need Java 21 JDK, Node.js, pnpm and PostgreSQL 16,
the rest (Gradle and Playwright) gets downloaded automatically.

    - Requires local admin / sudo to install JDK 21, Node.js, pnpm and PostgreSQL 16.
    - You have to figure out all the quirks on your own. The local dev environment is as self-contained as possible, but your local configuration can still diverge in multitude of ways.
