#syntax=docker/dockerfile:1

FROM node:18-bullseye

# Set environment variable
ENV NODE_ENV=development

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first to leverage cache
COPY package.json package-lock.json ./

# Install dependencies (cached if package files unchanged)
RUN npm ci --include=dev

# Copy the rest of the source code (node_modules ignored via .dockerignore)
COPY . .

# Generate Prisma client (does not require DB connection)
RUN npx prisma generate

# Compile TypeScript to JavaScript
RUN npm run build

# Expose app port
EXPOSE 4001

# Push Prisma schema, seed DB, and start app at runtime
CMD ["sh", "-c", "npx prisma db push && echo 'Schema pushed' && npm run seed && echo 'Seed ran' && npm run start"]
