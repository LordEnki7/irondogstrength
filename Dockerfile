FROM node:20-slim AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDeps needed for build like vite, esbuild)
# The trailing check verifies vite actually installed — fails loudly otherwise
RUN npm ci --no-audit --no-fund && test -x node_modules/.bin/vite && echo "deps OK v4"

# Build frontend + server bundle
COPY . .
RUN ./node_modules/.bin/vite build && ./node_modules/.bin/esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Production stage — lean image, no devDeps
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
# Required at runtime — set these in Dokploy environment variables:
# DATABASE_URL, SESSION_SECRET, CLOUDFARE_ACCESS_KEY_ID, CLOUDFARE_SECRET_ACCESS_KEY

# Copy built output and install only production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy static public assets (images, audio, thumbnails, uploads)
COPY --from=builder /app/client/public ./client/public

EXPOSE 5000

CMD ["node", "dist/index.js"]
