# API Contract Patterns

Shared conventions for API communication between backend and frontend.

<api_contracts>
  ALL app routes return { data: ... }. Client auto-unwraps.

  Backend: c.json({ data: posts })
  Frontend: api.get<Post[]>()  // Returns Post[], not { data: Post[] }

  Exceptions (no envelope):
  - /api/auth/* (Better Auth owns response)
  - 204 No Content
  - Non-JSON (use api.raw())

  Done gate: typecheck + e2e flow must pass before task complete.
</api_contracts>

<response_envelope>
  All app routes: c.json({ data: value })
  Errors: c.json({ error: { message, code } }, 4xx)

  cURL test: curl $BACKEND_URL/api/posts → { "data": [...] }
</response_envelope>

<auth_cors>
  Better Auth trustedOrigins (string wildcards):
  ["http://localhost:*", "http://127.0.0.1:*", "https://*.dev.vibecode.run", "https://*.vibecode.run", "https://*.vibecodeapp.com", "https://*.vibecode.dev", "https://vibecode.dev"]

  WRONG: RegExp objects or returning boolean - crashes origin trust.
  RIGHT: String array with * wildcards.

  CORS middleware (separate from trustedOrigins): echo specific origin, not "*".
  Browsers reject "*" with credentials: "include".
</auth_cors>

<prisma_strategy>
  Dev/preview: bunx prisma db push (avoids P3005), only when DATABASE_URL is the sandbox's own SQLite file (file:...).
  Hosted database (Supabase, Neon, any postgres:// or mysql:// URL): it may hold the published app's or another app's
  data, so never db push, --accept-data-loss, --force-reset or migrate reset.
  Automatic external changes support PostgreSQL only. Other providers skip schema sync;
  explain the proposed changes and ask the user before applying any schema change manually.
  For PostgreSQL, apply additive changes instead:
    bunx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script > /tmp/schema-change.sql
    then, if it only adds (no DROP, ALTER COLUMN, RENAME, MODIFY, CHANGE), bunx prisma db execute --file /tmp/schema-change.sql --schema prisma/schema.prisma
  Production without prisma/migrations: publishing updates the database from schema.prisma by itself.
  Do not create prisma/migrations or run prisma migrate dev unless the user asks for migrations.
  If the project already uses migrations, production applies only those files, so add one for every schema change.

  Startup issue: If routes return 404 but health works, Prisma client wasn't generated.
  Fix: bunx prisma generate && restart backend
  The start script auto-runs prisma generate if schema.prisma exists.
</prisma_strategy>

<api_typing>
  Type inner value only:
  ✅ api.get<Post[]>('/api/posts')
  ❌ api.get<{ data: Post[] }>()
  ❌ api.get<{ posts: Post[] }>()

  "Cannot read properties of undefined" = wrong type shape.
</api_typing>
