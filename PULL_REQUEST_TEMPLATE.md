---
fix: backend server syntax + scripts

Fixes a syntax/runtime error in backend/server.js: the streamGenerateContent API client had a truncated endpoint string which caused a parse error and prevented the server from starting.

Removes unsupported --env-file flags from backend/package.json scripts and uses node/nodemon; dotenv is loaded via code.

Adds node-fetch dependency to backend/package.json.

Notes/next steps for reviewer:
- Provide backend/.env.local with GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION, PROXY_HEADER
- Confirm Node version (Node 18+ preferred) or keep node-fetch
- Run `npm install` in backend and start with `npm run dev`
---
