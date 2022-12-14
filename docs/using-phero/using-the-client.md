---
title: "Using the client"
---

The client is generated by running `phero` and it's based on the Phero file on the server. It could be used in any TypeScript based frontend project, or even on different servers or in node-executables. Go nuts! As long as there's TypeScript, you can use the Phero client.

You can initialise the client like so:

```ts
import { PheroClient } from "./phero.generated"

const fetch = window.fetch.bind(window)
const client = new PheroClient(fetch, "http://localhost:3030")
```

The Phero client is a class that takes a couple of arguments:

- `fetch`: Doing network requests can work differently, depending on the environment of your app. Provide the Phero client with any implementation of [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) in order to do requests to the server.
- `url`: The full url where your server is running at. We would recommend putting this in a configurable variable, because it would probably be different between local development and going to production.
- `options`: An object that contains additional configuration:
  - `context`: An object to provide the context for each service. Go to [Context and middleware](/docs/using-phero/context-and-middleware) for more information about this topic.

Once you've got an initialised client, you can call functions on the server like there're regular, local functions:

```ts
await client.exampleService.helloWorld()
```
