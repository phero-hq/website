---
title: "Deploying to GCloud Functions (a.k.a. Firebase Functions)"
---

Google Cloud offers serverless functions. Google calls these `Google Cloud Functions`. Some people know them as `Firebase Functions`. Under the hood they are the same thing.

In order to deploy your Phero server, there's one last step: making an export. When you export your server, Phero compiles an optimised bundle for you to deploy.

## Prerequisites

Make sure you've installed `gcloud CLI`. If you haven't installed it yet, follow the steps here: https://cloud.google.com/sdk/docs/install

## Steps

First, navigate to your server directory and install `@google-cloud/functions-framework`:

```
cd api
npm install @google-cloud/functions-framework
```

To make an export of your Phero services, run:

```
npx phero@latest server export --flavor gcloud-functions
```

This will output an `export` directory with a directory for each `service`. To deploy one of these services, run:

```
gcloud functions deploy helloWorldService \
  --entry-point helloWorldService \
  --trigger-http \
  --runtime nodejs16 \
  --source "./export/helloWorldService"
```

Note that this example deploys a Google Cloud Function called `helloWorldService`. You probably have named your service something else ;). Replace `helloWorldService` with the name of your service.

Here's the full documentation for this command: https://cloud.google.com/sdk/gcloud/reference/functions/deploy. You probably also want to specify your region, and more...

That's it! Now repeat this step for all your services. You probably want to make a bash script which automates this for you.
