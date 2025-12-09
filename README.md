This project uses Next.js, Prisma, PostgreSQL for storing data, and shadcn/ui for components.

## Running locally
1) Install dependencies:
```
npm install
```
2) Set environment:
- Copy `.env.example` to `.env.local` (or `.env`) and set `DATABASE_URL` to a reachable Postgres instance.
3) Generate the Prisma client (after env is set):

4) Start the dev server:
```
npm run dev
```

## Database setup & seeding
1) Push schema to the database (creates tables):
```
npm run db:push
```
2) Seed universities data (uses `src/server/seed.ts`):
```
npm run tsx src/server/seed.ts
```

## Useful scripts
- `npm run db:studio` – open Prisma Studio to browse data.
- `npm run lint` / `npm run typecheck` – code quality checks.
