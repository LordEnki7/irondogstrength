---
name: Dokploy Docker build quirks
description: Lessons from getting the Dokploy Docker build to pass for this app
---
- Docker layer cache is keyed on the actual RUN command text; comments do NOT bust the cache. To force a re-run, change the command itself (e.g. append `&& echo "v3"`).
- **Why:** A poisoned `npm ci` layer (exit 0 but empty node_modules) kept getting reused, causing misleading `vite: not found` errors downstream.
- `npm error Exit handler never called!` during `npm ci` on `node:20-alpine` is a known npm/Alpine bug (often under memory pressure). Fix: use `node:20-slim` (Debian) and `--no-audit --no-fund`.
- **How to apply:** Keep the Dockerfile on node:20-slim; add a `test -x node_modules/.bin/<tool>` check after install so broken installs fail loudly at the install step.
