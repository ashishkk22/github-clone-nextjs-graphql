
<div align="center">
  <h1>Github Clone - Github's Graphql Api, NextJs</h1>
</div>

### Signup Page
![image](https://github.com/ashishkk22/scientific-calculator/assets/83124264/de94039f-7d19-4151-a7ba-e964e23e6632)

### Home Page
![image](https://github.com/ashishkk22/github-clone-nextjs-graphql/assets/83124264/e6936366-b81c-4c02-af81-3f82d2a3d7f9)

<br />

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express</a></li>
    <li><a href="https://www.npmjs.com/package/graphql-request">Graphql-request</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Github Clone supports basic signup and login features.
- It has a proxy server to hide the Github secret token and handle the requests only from authorized users.
- Users can view their followers, following, and repositories and filter them.
- Users can search for a user with an email or Github ID and view their profile and their followers/following sections.

### 📁 Project Structure

The project structure is organized into two folder such as client and server.

- **`client`**: contains components, generated (graphql typescript types), lib (apolloclient), pages (nextjs page dir), styles, utils and validation (form schema) folders.

![image](https://github.com/ashishkk22/github-clone-nextjs-graphql/assets/83124264/ce7477ed-cb23-4227-83d6-73926d52e163)

- **`server`**: contains controllers, middlewares, models and routers folders.

![image](https://github.com/ashishkk22/github-clone-nextjs-graphql/assets/83124264/875890a5-481f-44b8-bff9-21c34d65e20b)

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file. you can refer .env.example file for the references.

Client
`NEXT_PUBLIC_API_ENDPOINT`

Server
`DB_LINK`
`CRYPTO_KEY`
`CRYPTO_IV`
`CRYPTO_ALGO`
`JWT_COOKIE_EXPIRES`
`JWT_EXPIRE`
`JWT_SECRET`
`CLIENT_LINK`

<!-- Getting Started -->

## :toolbox: Getting Started

### System Requirements

- git v2.13 or greater
- nodejs `14 || 16 || 18`
- npm v8.16.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  https://github.com/ashishkk22/github-clone-nextjs-graphql.git
```

Go to the project directory

```bash
  cd github-clone-nextjs-graphql
```

Install dependencies and add the required environment variables in the .env

```bash
  cd client
```

```bash
  yarn install
```

Repeat the same process the install the dependencies in the server.

Start the dev server in the client and server with below command.

```bash
  yarn dev
```


<!-- Contact -->

## :handshake: Contact

Ashish Kachhadiya - ashishkachhadiya22@gmail.com
