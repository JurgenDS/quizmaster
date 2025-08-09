# Run in Podman

- [Prerequisites](#prerequisites)
- [Create a Dev Environment Container](#create-a-dev-environment-container)
- [macOS (Apple Silicon) with Docker Desktop](#macos-apple-silicon-with-docker-desktop)

## Prerequisites

0. On Windows, make sure you have [WSL2 installed](https://learn.microsoft.com/en-us/windows/wsl/install):

    ```sh
    wsl --install
    ```

1. [Install Podman](https://podman.io/docs/installation).
2. Optionally [install Podman Desktop](https://podman-desktop.io/downloads), if you prefer GUI.
3. On Windows, **reboot** your machine.
4. Create Podman machine:

    ```sh
    podman machine init
    podman machine start
    ```

### macOS (Apple Silicon)

If you're on a Mac with Apple Silicon (M1/M2), install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/). No WSL is required on macOS.

## Create a Dev Environment Container

To create the development environment container, run:

```sh
podman run -it -d -p 2222:22 -p 8080:8080 -p 5432:5432 -p 5173:5173 -p 3333:3333 --name quizmaster-dev ghcr.io/scrumdojo/quizmaster-java-devenv:v1
```

The container runs in the background, so that you can connect to it from your favorite IDE.

To stop the container, run on your host OS:

```sh
podman stop quizmaster-dev
```

To restart the container, run on your host OS:

```sh
podman start quizmaster-dev
```

## macOS (Apple Silicon) with Docker Desktop

If you prefer Docker Desktop on macOS, use the equivalent Docker commands. The image is published for multiple architectures.

Create the container:

```sh
docker run -it -d \
  -p 2222:22 -p 8080:8080 -p 5432:5432 -p 5173:5173 -p 3333:3333 \
  --name quizmaster-dev \
  ghcr.io/scrumdojo/quizmaster-java-devenv:v1
```

Stop the container:

```sh
docker stop quizmaster-dev
```

Start the container again:

```sh
docker start quizmaster-dev
```

Tip: Alternatively, you can open the repository directly in the included dev container "QuizMaster (Apple Silicon / arm64 Dev Container)" using VS Code/Cursor → Dev Containers: Reopen in Container. This sets up Java 21, Node 22 + pnpm, PostgreSQL 16, and Playwright automatically on Apple Silicon.
