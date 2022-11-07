---
title: "Deploying a NodeJS server"
---

In order to deploy your Phero server, there's one last step: making an export.
When you export you server, Phero compiles an optimized server for you to deploy.

It does **not** use any framework like `express` or `fastify`. It compiles down to plain JavaScript which uses the built-in `http` module from NodeJS itself. This way we can guarantee there's little to no overhead between an issued request and actually calling your function.

## Steps

First navigate to your server dir:

```
cd api
```

To export as a NodeJS server, run:

```
npx phero@latest server export --flavor nodejs
```

This will generate a node script for each of your services. To run one of your services:

```
  cd ./export/helloWorldService
  npm i
  node index.js
```

That's it! From here it should be fairly straight forward to deploy it to serveral cloud providers or anywhere you like.

## Change the port number

By default it will run a server on port `2222`. If you want to change this, run with the `PORT` environment variable, like this:

```
  PORT=3333 node index.js
```
