# syntax=docker/dockerfile:1.4
FROM node:22-bullseye

WORKDIR /usr/src/app

# Copy dependency files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy all source files
COPY . .

# Compile TypeScript
RUN npm run build

# Expose port
EXPOSE 4000

# Start the gateway
CMD ["sh", "-c", "npm run start"]
