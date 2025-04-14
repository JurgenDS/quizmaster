# Run in Podman
- [Prerequisites](#prerequisites)
- [Create a Dev Environment Container](#create-a-dev-environment-container)

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
