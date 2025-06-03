# Use Node.js 22 Alpine as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install pnpm and dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (default NestJS port)
EXPOSE 3000

# Start the application
CMD [  "npm", "run", "start:migrate:prod" ]