---
name: Dokploy Docker build quirks
description: Lessons from getting the Dokploy Docker build to pass for this app
---
- Docker layer cache is keyed on the actual RUN command text; comments do NOT bust the cache. To force a re-run, change the command itself (e.g. append `&& echo "v3"`).
- **Why:** A poisoned `npm ci` layer (exit 0 but empty node_modules) kept getting reused, causing misleading `vite: not found` errors downstream.
- `npm error Exit handler never called!` during `npm ci` is an npm 10.8 bug, NOT OS-specific (hit on both alpine and node:20-slim). The install actually completes, then npm exits non-zero.
- **How to apply:** Wrap install as `(npm ci ... || true)` and gate on real checks like `test -x node_modules/.bin/vite` — the test is the true pass/fail signal, not npm's exit code.
