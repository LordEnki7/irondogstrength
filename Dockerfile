FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --ignore-scripts

# Build stage
FROM base AS builder
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Required at runtime — set these in Dokploy environment variables:
# DATABASE_URL, SESSION_SECRET, CLOUDFARE_ACCESS_KEY_ID, CLOUDFARE_SECRET_ACCESS_KEY

# Copy built assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy public assets (images, audio, uploads, thumbnails)
COPY --from=builder /app/client/public ./client/public

EXPOSE 5000

CMD ["node", "dist/index.js"]
