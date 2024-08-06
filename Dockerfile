#############################
# Stage 1: Local Development
FROM --platform=linux/amd64 node:18-alpine as development

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests to the container
# Using wildcard to ensure both package.json and package-lock.json are copied
# This prevents re-running npm install on each code change
COPY --chown=node:node package*.json ./

# Install dependencies using npm ci for a clean slate
RUN npm ci

# Copy the application source code
COPY --chown=node:node . .

# Copy .env file
COPY --chown=node:node .env ./

# Switch to non-root user
USER node

######################
# Stage 2: Production Build
FROM --platform=linux/amd64 node:18-alpine as build

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests
COPY --chown=node:node package*.json ./

# Copy node_modules from development stage to avoid reinstalling dependencies
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Copy application source code
COPY --chown=node:node . .

# Copy .env file
COPY --chown=node:node .env ./

# Run the build script to generate production-ready code
RUN npm run build

# Set environment variable for production
ENV NODE_ENV production

# Clean install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Use non-root user
USER node

############
# Stage 3: Production
FROM --platform=linux/amd64 node:18-alpine as production

# Copy the built application and dependencies from the build stage
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Copy .env file
COPY --chown=node:node .env ./

# Expose the application port
EXPOSE 4000

# Define the command to run the application
CMD ["node", "dist/main.js"]
