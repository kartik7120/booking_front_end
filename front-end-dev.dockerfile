FROM node:18-alpine

# Install build tools for native modules (if needed)
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy dependency manifests first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app (TypeScript + Vite)
RUN npm run build

# Expose the port Vite uses in dev mode
EXPOSE 3000

# Start the dev server (for production, you'd serve the built files differently)
CMD ["npm", "run", "dev"]
