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

# Expose port
EXPOSE 4002

# Run seed and start service
CMD ["sh", "-c", "node dist/models/seed.js && echo 'Seed completed' && npm run start"]
