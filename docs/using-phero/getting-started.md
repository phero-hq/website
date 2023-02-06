---
title: "Getting Started"
---

Let's setup an example project of a server and client with the following structure:

```
phero-example-project
├── api
└── app
```

## Step 1: Set up the backend

To initialise a Phero server, do the following:

```
# Go to your backend project directory:
cd ./api
​
# Make sure npm and TypeScript are ready to go:
npm init -y
npm install typescript --save-dev
npx tsc --init
​
# Add Phero to your backend project:
npx phero init server
```

Running the `phero init server` command does a couple of things:

- Install `@phero/server`.
- Create a Phero-file at `src/phero.ts`.

You can do these steps manually as well. The Phero-file is the entry-point for Phero to know what your code is, so it's important to keep it there.

:::caution
At this moment, there is an additional step of configuration needed. Add these lines to the tsconfig.json of your server:

```
{
  "compilerOptions": {
    ...
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

We're working on a fix for this, so you won't have to do this.
:::

## Step 2: Set up the frontend

To add Phero to your frontend, do the following:

```
# Go to your frontend project directory:
cd ../app

# Make sure npm and TypeScript are ready to go:
npm init -y
npm install typescript --save-dev
npx tsc --init

# Add Phero to your frontend project:
npx phero init client
```

This does the following:

- Install `@phero/client`.
- Add `phero.generated.ts` to `.gitignore`.
- Create an example file at `src/phero.ts`.

You can do these steps manually as well. It's up to you what you want to do with `src/phero.ts` in this case. It's there to let you know about how to use the client, but that code could be anywhere in your app-project. You're free to check in `phero.generated.ts` into version-control, but we advise not to.

## Step 3: Run the development environment

Now would be a great time to run the Phero CLI. This will look for projects where Phero-packages are installed and do either of the following things:

- When `@phero/server` is installed in a project:
  - Your `phero.ts` file (and all dependencies) will be monitored for changes.
  - A new `phero-manifest.d.ts` will be generated when anything changes.
  - The server will start to handle incoming requests.
- When `@phero/client` is installed in a project:
  - It will look for a running server and monitor it for changes.
  - As soon as a change is detected, an updated client will be generated.

There are multiple ways the CLI can find a project. For the projects described above, this will be:

- When the current directory itself is a project where one of the packages is installed, it will run what's needed for that. So if we run `cd ./api && npx phero`, it will run the server.
- When one of the directories directly below the current directory has one of the packages installed, it will run what's needed for all of them at the same time: The server in `./api` and the client in `./app`.
- When there's a `package.json` with a `workspaces` property in the current directory (typically the root of your repo), it will run what's needed for all of them.
