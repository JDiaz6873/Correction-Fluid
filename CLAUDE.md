# Vibecode Workspace

This workspace contains a mobile app and backend server.

<projects>
  webapp/    — React app (port 8000, environment variable VITE_BASE_URL)
  backend/   — Hono API server (port 3000)

  In production, the webapp uses relative URLs (/api/...) so it works on any domain.
  VITE_BACKEND_URL is only needed in development for cross-origin requests to the backend on a different port.

  Set `baseURL: env.BACKEND_URL` in betterAuth() config (required for crossSubDomainCookies, harmless otherwise —
  proxy headers override via trustedProxyHeaders: true).
  The webapp auth client (createAuthClient) should use: baseURL: import.meta.env.VITE_BACKEND_URL || undefined
  The webapp API helper should use: import.meta.env.VITE_BACKEND_URL || "" (empty string = relative URLs)
</projects>

<coordination>
  When a feature needs both frontend and backend:
  1. Define Zod schemas for request/response in backend/src/types.ts (shared contracts)
  2. Implement backend route using the schemas
  3. Test backend with cURL (use $BACKEND_URL, never localhost)
  4. Implement frontend, importing schemas from backend/src/types.ts to parse responses
  5. Test the integration

  <shared_types>
    All API contracts live in backend/src/types.ts as Zod schemas.
    Both backend and frontend can import from this file — single source of truth.
  </shared_types>
</coordination>

<skills>
  Project skills:
  - frontend-developer: Changes to the webapp frontend (read webapp/CLAUDE.md)
  - backend-developer: Changes to the backend API (read backend/CLAUDE.md)

  Shared skills:
  - database-auth: Set up Prisma + Better Auth for user accounts and data persistence
  - vibecode-apis: Read before adding any AI or third-party API (LLMs, agents, image, video, voice, search, data), before generating any image, video or sound, and when building a landing page, website or first screen that should impress: it makes bespoke images and a hero video for the project.
  - upload-assets: Vibecode Storage. Use for ANY photo, image, profile picture, file upload, video, audio, PDF, or attachment the app uploads or keeps, and to move base64 images out of the database. Never write uploads, or files the app generates while it runs (AI images, audio, video), to local disk, the project folder or the database.

  Frontend only skills:
  - frontend-app-design: Create distinctive, production-grade web interfaces using React, Tailwind, and shadcn/ui. Use when building pages, components, or styling any web UI.
</skills>

<environment>
  System manages git and dev servers. DO NOT manage these.
  The user views the app through Vibecode Mobile App with a webview preview or Vibecode Web App with an iframe preview.
  The user cannot see code or terminal. Do everything for them.
  Write one-off scripts to achieve tasks the user asks for.
  Communicate in an easy to understand manner for non-technical users.
  Be concise and don't talk too much.
</environment>
