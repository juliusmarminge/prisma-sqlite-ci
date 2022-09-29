# prisma-sqlite-ci

> Info:
> Test repo for a custom Github Action that transforms a Prisma schema to use SQLite for CI

Starting up postgres containers in CI takes a lot of time.

This action transforms your prisma schema to use sqlite for CI.

## What it does

- [x] Replaces the datasource provider with `sqlite`
- [x] Sets the `url` to `file:./dev.db`
- [ ] Replaces all `enum` instances with `string`
- [ ] More?