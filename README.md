# YourITSoftware TODO

<div style="display: flex; gap: 15px">
<img alt="nest.js" src="https://www.
vectorlogo.zone/logos/nestjs/nestjs-ar21.svg" width="150px">

<img alt="react.ts" src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" width="100px">
</div>

## Your Monorepo Todo Project: Server and Client Under One Roof

This repository is a monorepo containing both the server-side and client-side code for a modern web application. It leverages the power of [NestJS](https://nestjs.com/) for a robust backend and [Vite + ReactJS](https://vitejs.dev/) for a blazing-fast frontend experience, both written in TypeScript for strong type safety.

**Project Structure:**

- **server:** NestJS application with TypeORM for database interaction.
- **client:** Vite React application with TypeScript for a performant and maintainable user interface.

## Powered with Bun.js

<div style="display: flex; justify-content: center;">
<img alt="bun.js logo" src="https://bun.sh/logo.svg" width="150px">
</div>

Bun is a new contender in the JavaScript runtime world, aiming to be a fast and all-in-one toolkit for building web applications.

- **Fast**: Bun boasts impressive performance,
- **All-in-one**: Bun provides features beyond just a runtime.
- **Node.js Compatibility**
- **Modern JavaScript Features**
- **Development Focus**

## Dockerizing for Efficiency

<img alt="docker logo" src="https://1000logos.net/wp-content/uploads/2021/11/Docker-Logo.png">

This project embraces Docker and Docker Compose for streamlined development and deployment. Docker containers provide isolated environments for each service, ensuring consistency and reproducibility. Docker Compose simplifies the orchestration of services, making it easier to get up and running quickly.

## Setting Up Your Development Environment

**Requirements:**

- **Docker:** Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
- **Docker Compose:** Docker Compose is usually included with Docker Desktop. If not, follow the installation instructions on the official website: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).
- **Node.js and npm (or yarn):** These are required for building both the server and client applications. You can download them from the official Node.js website: [https://nodejs.org/en](https://nodejs.org/en)

**Installation Steps:**

1.  `git clone https://github.com/tolikhalas/YourITSoft-Test-Task.git`

2. `cd YourItSoft`

3. Setup `.env` files inside `client` & `server` folders: `.env`, `.env.developement.local`, `.env.test.local`, `.env.production.local`.
`client` uses `.env` file's settings, `server` uses `.env.development.local` in contrast.

4. `docker-compose up`

----

- `docker-compose up -d `

1.  This will start both the server and client containers in detached mode (background).
2.  You can access your application in a browser at:

    - The NestJS server typically runs on port 3000 (you can customize this in server/docker-compose.yml).
    - The Vite React application usually serves on port 5173 by default (again, customizable in client/docker-compose.yml).

    - Server API: http://localhost:3000 (or your custom port)
    - Client UI: http://localhost:3030 (or your custom Vite port)

## Testing
Testing info provided separate in each folder for each app


**Additional Notes:**

- You can view container logs using docker-compose logs .
- Stop the containers with docker-compose stop.
- Refer to the docker-compose.yml files in the server and client directories for further customization options.

This guide equips you with the tools to set up your development environment and start working on this exciting monorepo project. Feel free to explore the codebase, make contributions, and leverage the benefits of using Docker and Docker Compose for streamlined development!
