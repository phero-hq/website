---
title: "CORS"
---

To allow web clients to connect to a server, its origin needs to be configured on the server (like any NodeJS server). For more information about this subject, take a look at [MDN](https://developer.mozilla.org/en-US/docs/Glossary/CORS). Provide a Phero service with a domain whitelist to make this work:

```ts
import { createService } from "@phero/server"

export const exampleService = createService(
  {
    createArticle,
    deleteArticle,
  },
  {
    cors: {
      originWhitelist: ["http://localhost:3000", "https://your-app.com"],
    },
  },
)
```

You're free to define a single whitelist for multiple services, or add environment variables to provide more flexibility on the deployment:

```ts
import { createService } from "@phero/server"

const cors = {
  originWhitelist: [
    "http://localhost:3000",
    process.env.APP_DOMAIN as string, // make sure APP_DOMAIN is set
  ],
}

export const aService = createService(
  {
    /* ... */
  },
  { cors },
)
export const bService = createService(
  {
    /* ... */
  },
  { cors },
)
export const cService = createService(
  {
    /* ... */
  },
  { cors },
)
```

```
APP_DOMAIN=https://your-app.com node index.js
```
