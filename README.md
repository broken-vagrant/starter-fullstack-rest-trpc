# Full Stack starter (REST)

## Requirements

1. `Node >=v14`

## Recommended

1. [mysql vscode extension](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2&ssr=false#review-details)

## Available Scripts

### Init

```sh
# setup mswjs for browser
pnpm web msw:init
```

### [api](./packages/api)

If you want to avoid docker setup ,use sqlite (check prisma docs)

```sh
# start docker (mysql)
pnpm api db-up
pnpm api dev
pnpm api test
pnpm api build
pnpm api start
# don't forget to stop mysql
pnpm api db-down
```

### [web](./packages/web)

```sh
pnpm web preview
pnpm web test
pnpm web dev
# deploy to gh-pages
pnpm web deploy
```
