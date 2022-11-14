---
title: "Deploying to Vercel"
---

In order to deploy your Phero server, there's one last step: making an export. When you export your server, Phero compiles an optimised bundle for you to deploy.

For now, Phero compiles your services into Vercel Serverless Functions, Edge Functions are not yet supported.

First, navigate to your server directory:

```
cd api
```

To export your Phero server, run:

```
npx phero@latest server export --flavor vercel
```

This will generate a `.vercel` directory, with all the code necessary to deploy.

To deploy this bundle, run:

```
  npx vercel@latest deploy --prebuilt
```

That's it! For each subsequent deploy you can repeat the steps above.
