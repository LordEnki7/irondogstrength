---
name: Dokploy Docker build quirks
description: Lessons from getting the Dokploy Docker build to pass for this app
---
- Docker layer cache is keyed on the actual RUN command text; comments do NOT bust the cache. To force a re-run, change the command itself (e.g. append `&& echo "v3"`).
- **Why:** A poisoned `npm ci` layer (exit 0 but empty node_modules) kept getting reused, causing misleading `vite: not found` errors downstream.
- `npm error Exit handler never called!` from npm 10.8 masked the real error; upgrading to npm 11 in the Dockerfile surfaced it as a proper ENOTFOUND.
- **Root cause of all install failures:** Replit rewrites `package-lock.json` resolved URLs to `http://package-firewall.replit.local/npm/...`, which only resolves inside Replit. Any external Docker/CI build fails.
- **How to apply:** Before pushing for external deploys, run `sed -i 's|http://package-firewall.replit.local/npm/|https://registry.npmjs.org/|g' package-lock.json`. Recheck after any npm install in Replit — Replit may rewrite it again.
