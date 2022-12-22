---
title: "Comparing Phero to tRPC"
---

One question we get the most is:

> How does Phero compare to tRPC, which is already getting super popular?

If you're wondering the same thing, you've ended up in the right place.

In short: Yes, there are a lot of similarities, but there're also huge differences between the two. For the record, we didn't see tRPC and started building Phero to be better or different. We've built Phero, started using it, saw tRPC popping up along the way and we didn't think it was good enough to drop Phero. This article will outline the similarities and differences, so you can make up your mind yourself.

Like most things in our industry, it's best to compare things in the form of an example. Let's say we'll build a screen, where a user can edit its profile and settings. In these examples we'll use React on the frontend and a regular array as our datastore on the backend, but these are interchangeable with different approaches. You can see the full projects of these comparisons in the examples repo, for [tRPC](https://github.com/phero-hq/examples/tree/main/comparisons/trpc) and [Phero](https://github.com/phero-hq/examples/tree/main/comparisons/phero).

## Defigning your data-model

We believe that the best starting point of most projects is the data-model. In our case, we'll need a user, with a profile and some settings. There are multiple ways to do this in tRPC, but the most common way is by using [Zod](https://www.npmjs.com/package/zod) (or something similar). We'll start with the profile:

```ts
export const UserProfile = z.object({
  firstName: z.string(),
  lastName: z.string(),
})
export type UserProfile = z.infer<typeof UserProfile>
```

What we're doing here is using `z.object` to define what properties are in a `UserProfile`, and infering the type from there. The same goes for the settings, where we'll need an enum as well:

```ts
export enum Theme {
  Minimal = "Minimal",
  Advanced = "Advanced",
}
export const ThemeEnum = z.nativeEnum(Theme)
export type ThemeEnum = z.infer<typeof ThemeEnum>

export const UserSettings = z.object({
  recieveNewsletter: z.boolean(),
  preferredTheme: ThemeEnum,
})
export type UserSettings = z.infer<typeof UserSettings>
```

And let's put them together like so:

```ts
export const User = z.object({
  id: z.string(),
  profile: UserProfile,
  settings: UserSettings,
})
export type User = z.infer<typeof User>
```

This is one of those things where Phero really shines, because we can use solely TypeScript to do define our data-model:

```ts
export interface User {
  id: string
  profile: UserProfile
  settings: UserSettings
}

export interface UserProfile {
  firstName: string
  lastName: string
}

export interface UserSettings {
  recieveNewsletter: boolean
  preferredTheme: Theme
}

export enum Theme {
  Minimal = "Minimal",
  Advanced = "Advanced",
}
```

In our opinion this is day and night, especially considering we've got a very simple example here. Imagine how it would become when things get more complex, like with arrays, unions, records, partials and so on. When you're in the need to learn more advanced types, you might as well learn how to do it in TypeScript instead of specific library, right? While it's amazing what Zod (and the like) can do, pure Typescript is the way to go here.

## Defigning your functions

What about the actual endpoints of your API? We can spot a couple of key differences:

- tRPC separates calls that are considered a "query" and a "mutation", Phero does not have such a concept.
- tRPC validates the arguments and return data, based on the zod-like validators described above. Phero has enough with your types to do the same thing, automatically.

This is how you'd do it in tRPC:

```ts
const usersRouter = t.router({
  get: t.procedure
    .input(String)
    .output(User)
    .query((req) => {
      // userId is available as req.input
    }),
  updateProfile: t.procedure
    .input(z.object({ userId: z.string(), profile: UserProfile }))
    .mutation(async (req) => {
      // userId is available as req.input.userId
      // profile is available as req.input.profile
    }),
  updateSettings: t.procedure
    .input(z.object({ userId: z.string(), settings: UserSettings }))
    .mutation(async (req) => {
      // userId is available as req.input.userId
      // settings is available as req.input.settings
    }),
})
```

In Phero, it would be something like this:

```ts
async function get(id: string): Promise<User> {
  // id is available as id
}

async function updateProfile(id: string, profile: UserProfile): Promise<void> {
  // id is available as id
  // profile is available as profile
}

async function updateSettings(
  id: string,
  settings: UserSettings,
): Promise<void> {
  // id is available as id
  // profile is available as profile
}

export const users = createService({ get, updateProfile, updateSettings })
```

What we like about this is that these functions read and work like any other function, because they are. And on top of that, the validation you get is identical: Phero has enough with your types to validate everything flowing in and out of these functions, something you'd use Zod for in tRPC. The catch is though: This works for everything that can be described in TypeScript, but nothing more than that. For example: If you've got an `email` property and you want to validate that it's actually an email, you'd have to do that yourself (or use something like Zod). In our experience, these cases are pretty rare compared to the values that can be defined in plain TypeScript. It's a tradeoff, but worth it in our opinion.

## Using the client

Both tRPC and Phero give you an RPC client for your frontend. This is great, because it minimizes silly mistakes like typo's in URL's, arguments, headers and so on. It's also the key to get to end-to-end type-safety, which is amazing to work with and rely on.

The way you'd call a function in tRPC defers a bit between queries and mutations:

```ts
const user = await trpc.users.get.query(userId)
await trpc.users.updateProfile.mutate({ userId, profile })
```

In Phero, it's like this:

```ts
const user = await phero.users.get(userId)
await phero.users.updateProfile(userId, profile)
```

Not a huge difference, but we think it's a bit more natural with Phero. Also, multiple arguments doesn't seem to be possible in tRPC, making you wrap multiple values inside of an object. Phero makes these functions act like any other function.

## Developer ergonomics

Leading to this point we've mostly covered syntax, but how is it to actually work with these tools? One thing that stands out is that tRPC doesn't need a build-step, while Phero does. The Phero CLI is blazing fast, but this is still something to be jealous about.

It seems that tRPC is most popular in monorepo's, where the backend is in the same npm-project as the frontend. We also prefer to have the backend and frontend in the same repo (even though that's not required for Phero), but we separate them out in their own npm-projects. That way you can pick the best tool for the job in both areas, and it's more fitting when you've got multiple frontends for the same backend. Putting them together does make sharing types between frontend and backend way easier though: In tRPC you can import them directly, while in Phero you'd have to import them from the generated client.

In practise, we don't mind the extra build-step. The Phero CLI runs the server for the API as well, so it's not an extra process to manage. Also, we've got big plans to generate way more than just a RPC client (more about that in the near future). Combining that with the syntax, relying on pure TypeScript, this tradeoff is worth it for us. **What about you?**
