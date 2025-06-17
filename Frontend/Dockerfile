# Use the official Node.js image as a base
FROM node:18.18.0-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Update browserslist database
RUN npx update-browserslist-db@latest

# Copy the rest of the application code
COPY . .

# Build the Next.js application with increased memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Use a smaller image for production
FROM node:18.18.0-alpine AS production

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/ .

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]