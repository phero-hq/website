---
title: "Deploying to Vercel"
---

In order to deploy your Phero server, there's one last step: making an export.
When you export you server, Phero compiles an optimized server for you to deploy.

For now Phero compiles your services into Vercel Serverless Functions. There's no way yet to compile it into Edge functions.

First navigate to your server dir:

```
cd api
```

To export your Phero server, run:

```
npx phero@latest server export --flavor vercel
```

This will generate an hidden `.vercel` directory with all the code necessary to deploy.

To deploy, please run:

```
  npx vercel@latest deploy --prebuilt
```

That's it!

For each subsequent deploy you can repeat the steps above.
