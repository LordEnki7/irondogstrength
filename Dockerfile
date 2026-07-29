FROM node:20-alpine AS builder
WORKDIR /app

# Install ALL dependencies (including devDeps needed for the build)
COPY package*.json ./
RUN npm ci

# Build frontend + server bundle
COPY . .
RUN npm run build

# Production stage — lean image, no devDeps
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Required at runtime — set these in Dokploy environment variables:
# DATABASE_URL, SESSION_SECRET, CLOUDFARE_ACCESS_KEY_ID, CLOUDFARE_SECRET_ACCESS_KEY

# Copy only what's needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copy static public assets (images, audio, thumbnails, uploads)
COPY --from=builder /app/client/public ./client/public

EXPOSE 5000

CMD ["node", "dist/index.js"]
