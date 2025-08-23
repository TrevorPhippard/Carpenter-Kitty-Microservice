#syntax=docker/dockerfile:1

FROM node:18-bullseye

# Set environment variable
ENV NODE_ENV=development

# Set working directory
WORKDIR /usr/src/app

# Install dependencies using cache and bind mount (requires BuildKit)
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --include=dev

COPY . .

# Compile TypeScript to JavaScript (creates dist/)
RUN npm run build

# Expose port used by the app
EXPOSE 1337

# Push Prisma schema to database and start the built app
CMD ["sh", "-c", "npm run start"]
