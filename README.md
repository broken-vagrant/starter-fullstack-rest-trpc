# Full Stack starter (REST)

## Requirements

1. `Node >=v14`

## Recommended

1. [mysql vscode extension](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2&ssr=false#review-details)

## Available Scripts

### Init

```sh
# setup mswjs for browser
pnpm app msw:init
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

### [App](./packages/app)

```sh
pnpm app preview
pnpm app test
pnpm app dev
# deploy to gh-pages
pnpm app deploy
```
