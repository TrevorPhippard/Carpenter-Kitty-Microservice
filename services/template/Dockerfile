# syntax=docker/dockerfile:1.4
FROM node:22-bullseye

ENV NODE_ENV=development
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build

# Expose port used by the app
EXPOSE 1337

# Push Prisma schema to database and start the built app
CMD ["sh", "-c", "npm run start"]