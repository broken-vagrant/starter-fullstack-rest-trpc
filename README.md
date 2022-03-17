# Full Stack starter (REST)

## Requirements

1. `Node >=v14`

## Available Scripts

### Init

```sh
# setup mswjs for browser
pnpm app msw:init
```

### [api](./packages/api)

```sh
# start docker (to mongo container)
pnpm api db-up
pnpm api dev
pnpm api test
pnpm api build
pnpm api start
# don't forget to stop mongo
pnpm api db-down
```

### [App](./packages/app)

```sh
pnpm app preview
pnpm app test
pnpm app dev
# deploy to gh-pages
pnpm app deploy
```
