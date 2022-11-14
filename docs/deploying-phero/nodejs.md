---
title: "Deploying a NodeJS server"
---

In order to deploy your Phero server, there's one last step: making an export. When you export your server, Phero compiles an optimised bundle for you to deploy.

It does **not** use any framework like `express` or `fastify`. It compiles down to plain JavaScript which uses the built-in `http` module from NodeJS itself. This way we can guarantee that there's as little overhead as possible between a request and actually calling your function.

## Steps

First, navigate to your server directory:

```
cd api
```

To export as a NodeJS server, run:

```
npx phero@latest server export --flavor nodejs
```

This will generate a node script for each of your services in a `.phero` directory. To run one of these services:

```
  cd .phero/helloWorldService
  npm i
  node index.js
```

That's it! From here you can deploy this service to any provider that supports NodeJS.

## Change the port number

By default it will run a server on port `2222`. If you want to change this, run with the `PORT` environment variable, like this:

```
  PORT=3333 node index.js
```
